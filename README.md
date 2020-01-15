# ANZx Test 2

[![Build Status](https://travis-ci.org/sammcj/anz-test-2.svg?branch=master)](https://travis-ci.org/sammcj/anz-test-2) [![codebeat badge](https://codebeat.co/badges/10c14261-e2e7-450e-ac79-ea5d8e83b155)](https://codebeat.co/projects/github-com-sammcj-anz-test-2-master)


[Docker Hub](https://hub.docker.com/repository/docker/sammcj/anz-test-2/tags?page=1).

A minimal API built with Express JS and run with Docker that exposes a HTTP API server.

# Background Information:

- I'm coming from a Platform Operations and Automation (Puppet) background to Platform Engineering.
- This is testing web development skills and as such is not in my area of expertise.
- As requested I've written the application in Javascript, however this is my first attempt with the language and with web development.

---

### API output

Calling the API returns:

- The application version.
- The latest git commit SHA.
- A description of the application.

Sending a GET request to http://localhost:8000/version should return similar to the following:

```json
"myapplication": [
  {
    "version": "1.0",
    "lastcommitsha": "abc57858585",
    "description" : "pre-interview technical test"
  } ]
```

### Versioning

Application releases will comply with [Semantic Versioning 2.0.0](https://semver.org/) versioning.

### CI Builds

The Travis CI build is configured in `.travis.yml`

Travis:
- Builds the application-in Docker
- Runs some basic tests
- Deploys the docker image to [Docker Hub](https://hub.docker.com/repository/docker/sammcj/anz-test-2/)

If you wish to run builds against your own Travis instance, you'll need to set the `DOCKER_USERNAME` and `DOCKER_PASSWORD` variables in the Travis UI.

### Requirements

To use the provided Makefile the following are required:

- `make`
- `jq`
- `docker`
- `git`

And if you want to run the tests manually you'll need:

- `nodejs`
- Run `npm install` to install requirements

### Configuration

- `APP_NAME`: Sets the name of the application, configured in `deploy.env`
- `DOCKER_REPO`: Sets the path to the container repo, configured in `deploy.env`
- `PORT`: Configure this to the same port your Docker application exposes for use by the `make run` command, configured in `config.env`

### Build

Runs a Docker build of the application:

```
make build
```

### Run

Run the application in Docker once built:

```
make run
```
_Exposes an HTTP API at http://localhost:8000/version_

### Manually Run Tests:

```
make tests
```

### Tag

Tags the Docker image from the application version:

```
make tag
```

### Publish to Docker Hub

Pushes the build Docker image to Docker Hub:

_Note: Assumes you're logged into Docker Hub._

```
make publish
```

### Sequential Commands

You can run all commands sequentially, for example:

```
make build tag publish
```

### Additional Make Options

A complete list of make options can be obtained by running `make help`:

```
~ make help
help                           This help.
build                          Build the container
build-nc                       Build the container without caching
run                            Run container on port configured in `config.env`
stop                           Stop and remove a running container
release                        Make a release by building and publishing the `{version}` ans `latest` tagged containers to the container repo
publish                        Publish the `{version}` ans `latest` tagged containers to the container repo
publish-latest                 Publish the `latest` taged container to the container repo
publish-version                Publish the `{version}` taged container to the container repo
tag                            Generate container tags for the `{version}` and `latest` tags
tag-latest                     Generate container `{version}` tag
tag-version                    Generate container `latest` tag
version                        Output the current version
```

### Kubernetes

A basic Kuberentes deployment manifest can be found under [kubernetes/api-deployment.yml](kubernetes/api-deployment.yml)

### Security

- I have integrated [WhiteSource Bolt](https://bolt.whitesourcesoftware.com/github/) to scan this code repository for potential security problems which will automatically created as [issues](https://github.com/sammcj/anz-test-2/issues) when detected.
- GitHub Security scanning is enabled on this repo, it is scanning the dependencies for vulnerable package versions.
- For the purpose of demonstrating that the integrated automated security scanning as working, I have left potential problems that have been detected under [issues](https://github.com/sammcj/anz-test-2/issues).

## Future Improvements

I had very limited time to learn and build this, here is an initial list of things that could be improved:

#### Reduction in Docker image size

- I would need to do some more reading on what the minimal JS components to run the app are.
- It would be worth splitting it out into a multi-stage Dockerfile and run tests in the first image and from there only build with `--only=production` and the files to the final image.
- I did try the `-slim` node images, however there were issues and didn't have time to explore them further but this could be done.
- [This post](https://antonfisher.com/posts/2018/03/19/reducing-docker-image-size-of-a-node-js-application/) looks like a good starting point.

#### Extend tests

- While a simple Mocha Chai test is implemented to check that the API is returning a 200 when hit and that the JSON is valid, additional test cases could be added.


#### Improve handling of secrets

- At present the Travis build script logs into Docker Hub using secrets provided to the platform, this does temporarily store the access token within the build which is not ideal, this could be changed to use a more restrictive solution, perhaps even with a rotating one-time token.

#### Use GCP

- Travis is quite a traditional CI product, using something like GCP Cloud Run would be a simpler and more streamlined solution.

## Reference Material

- https://expressjs.com/en/starter/hello-world.html
- https://dev.to/easybuoy/testing-node-api-with-mocha-chai-248b
- https://rahmanfadhil.com/test-express-with-supertest/#getting-started
- https://docs.travis-ci.com/user/languages/javascript-with-nodejs/
- https://docs.travis-ci.com/user/build-stages/
- https://www.docker.com/blog/intro-guide-to-dockerfile-best-practices/
- https://docs.docker.com/develop/develop-images/multistage-build/
- https://medium.com/@exustash/three-good-practices-for-better-ci-cd-makefiles-5b93452e4cc3
