pipeline {
    agent any

    tools {
        // Must match the names from "Global Tool Configuration"
        nodejs 'NodeJS-18'
        tool 'SonarScanner'
    }

    environment {
        // CHANGE THIS to your Docker Hub username
        DOCKERHUB_USERNAME = 'dileeshakaveeshi'
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/my-react-app"
        // Must match the ID of the credential you created in Jenkins
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        SSH_KEY_CREDENTIAL_ID = 'devops-servers-key'
        SONAR_TOKEN_CRED_ID = 'sonar-token' // The Secret Text credential ID
        ANSIBLE_HOST_KEY_CHECKING = 'false' // Disables SSH host key checking
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: '[https://github.com/dileesha0901/my-react-app.git](https://github.com/dileesha0901/my-react-app.git)'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                sh 'npm install' // Sonar needs node_modules to analyze dependencies
                script {
                    // Get the SonarScanner tool path
                    def scannerHome = tool 'SonarScanner'
                    // Run the scanner, now pointing to SonarCloud
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=react-app-pipeline \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https-sonarcloud-io \
                        -Dsonar.organization=dileesha0901 \
                        -Dsonar.login=${SONAR_TOKEN_CRED_ID}
                    """
                }
            }
        }

        stage('Check Quality Gate') {
            steps {
                // This step polls SonarCloud for the analysis results
                // and will FAIL the pipeline if the Quality Gate is not 'OK'
                timeout(time: 1, unit: 'HOURS') {
                    // The 'abortPipeline: true' is what stops the build on failure
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            // This stage will only run if the Quality Gate passes
            steps {
                script {
                    // Use the build number as the image tag
                    def imageTag = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker build -t ${imageTag} ."
                    sh "docker tag ${imageTag} ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Login to Docker Hub using the stored credentials
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                }
                sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                sh "docker push ${IMAGE_NAME}:latest"
            }
        }

        stage('Deploy to Dev') {
            steps {
                // Use the SSH key credential
                withCredentials([sshUserPrivateKey(credentialsId: SSH_KEY_CREDENTIAL_ID, keyFileVariable: 'SSH_KEY_FILE')]) {
                    sh """
                        ansible-playbook /opt/ansible/deploy-app.yml -i /etc/ansible/hosts \\
                            --private-key \$SSH_KEY_FILE \\
                            --limit dev \\
                            --extra-vars "image_name=${IMAGE_NAME} image_tag=${env.BUILD_NUMBER}"
                    """
                }
            }
        }

        stage('Deploy to QA') {
            steps {
                // This creates a manual approval gate in Jenkins
                input "Deploy to QA environment?"

                withCredentials([sshUserPrivateKey(credentialsId: SSH_KEY_CREDENTIAL_ID, keyFileVariable: 'SSH_KEY_FILE')]) {
                    sh """
                        ansible-playbook /opt/ansible/deploy-app.yml -i /etc/ansible/hosts \\
                            --private-key \$SSH_KEY_FILE \\
                            --limit qa \\
                            --extra-vars "image_name=${IMAGE_NAME} image_tag=${env.BUILD_NUMBER}"
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images on the CI server
            sh "docker rmi ${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
            sh "docker rmi ${IMAGE_NAME}:latest || true"
            sh "docker logout"
        }
    }
}
