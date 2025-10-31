pipeline {
    agent any

    tools {
        // Must match the name from "Global Tool Configuration"
        nodejs 'NodeJS-18'
    }

    environment {
        // This is your correct Docker Hub username
        DOCKERHUB_USERNAME = 'dileeshakaveeshi'
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/my-react-app"
        // Must match the ID of the credential you created in Jenkins
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        SSH_KEY_CREDENTIAL_ID = 'devops-servers-key'
        // SONAR_TOKEN_CRED_ID is no longer needed here, as the wrapper handles it.
        ANSIBLE_HOST_KEY_CHECKING = 'false' // Disables SSH host key checking
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dileesha0901/my-react-app.git'
            }
        }

        // FIXED: Combined Analysis and Quality Gate stages
        stage('SonarCloud Analysis & Quality Gate') {
            steps {
                sh 'npm install' // Sonar needs node_modules to analyze dependencies
                
                // FIXED: This wrapper now links to the 'SonarCloud' config
                // from "Configure System". It provides the URL and Token automatically.
                withSonarQubeEnv('SonarCloud') {
                    script {
                        def scannerHome = tool 'SonarScanner'
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=react-app-pipeline \
                            -Dsonar.sources=. \
                            -Dsonar.organization=dileesha0901
                        """
                        // We no longer need Dsonar.host.url or Dsonar.login
                        // The withSonarQubeEnv wrapper injects them.
                    }
                }
                
                // FIXED: This step must run *after* the wrapper.
                // It now knows which analysis to check.
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        // REMOVED the separate 'Check Quality Gate' stage

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
                    // FIXED: Corrected typo DOKCER_USER -> DOCKER_USER
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

