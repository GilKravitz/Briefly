@echo off

REM Define the image name tag and docker-hub account
set IMAGE_NAME=briefly_ai
set IMAGE_TAG=1.0
set DOCKER_HUB_USERNAME=doredelman1996
set DOCKER_HUB_REPO=%DOCKER_HUB_USERNAME%/briefly_ai

REM Build the new Docker image with the specified tag
echo Building new Docker image %IMAGE_NAME%:%IMAGE_TAG%...
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

REM Check if the build was successful
IF ERRORLEVEL 1 (
    echo Failed to build the Docker image.
    exit /b 1
) ELSE (
    echo Docker image %IMAGE_NAME%:%IMAGE_TAG% built successfully.
)

REM Run the Docker container with the .env file from the parent directory
echo Running Docker container from image %IMAGE_NAME%:%IMAGE_TAG%...
docker run --env-file ..\.env %IMAGE_NAME%:%IMAGE_TAG%

REM Tag the image for Docker Hub
echo Tagging the image for Docker Hub...
docker tag %IMAGE_NAME%:%IMAGE_TAG% %DOCKER_HUB_REPO%:%IMAGE_TAG%

REM Log in to Docker Hub
echo Logging in to Docker Hub...
docker login

REM Check if the Docker image exists on Docker Hub
docker pull %DOCKER_HUB_REPO%:%IMAGE_TAG% > nul 2>&1
IF NOT ERRORLEVEL 1 (
    echo Docker image %DOCKER_HUB_REPO%:%IMAGE_TAG% already exists on Docker Hub.
    REM Optionally, you can remove the existing image before pushing the new one
    REM echo Removing existing Docker image from Docker Hub...
    REM docker rmi %DOCKER_HUB_REPO%:%IMAGE_TAG% -f
) ELSE (
    REM Push the Docker image to Docker Hub
    echo Pushing the Docker image to Docker Hub...
    docker push %DOCKER_HUB_REPO%:%IMAGE_TAG%
)

REM Check if the Docker image exists
docker images -q %IMAGE_NAME%:%IMAGE_TAG% > nul
IF NOT ERRORLEVEL 1 (
    echo Removing existing Docker image %IMAGE_NAME%:%IMAGE_TAG%...
    docker rmi %IMAGE_NAME%:%IMAGE_TAG% -f
)

pause
