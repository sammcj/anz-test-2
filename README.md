# ANZx Test 2

[![Build Status](https://travis-ci.org/sammcj/anz-test-2.svg?branch=master)](https://travis-ci.org/sammcj/anz-test-2) [![codebeat badge](https://codebeat.co/badges/10c14261-e2e7-450e-ac79-ea5d8e83b155)](https://codebeat.co/projects/github-com-sammcj-anz-test-2-master)


[Docker Hub](https://hub.docker.com/repository/docker/sammcj/anz-test-2/tags?page=1).

A minimal API built with Express JS and run with Docker that exposes a HTTP API server on http://localhost:8000

Calling the API returns:

- The application version.
- The latest git commit SHA.
- A description of the application.

_**Note: I don't have a developer background, this is my first shot at writing or packaging any Javascript or APIs.**_

For the purpose of demonstrating integrated automated security scanning, I have left potential problems that have been detected under [issues](https://github.com/sammcj/anz-test-2/issues).

## API output

Sending a GET request to /version should return similar to the following:

```json
"myapplication": [
  {
    "version": "1.0",
    "lastcommitsha": "abc57858585",
    "description" : "pre-interview technical test"
  } ]
```

### CI Builds

The Travis CI build is configured in `.travis.yml`

Travis:
- Builds the application-in Docker
- Runs some basic tests
- Deploys the docker image to [Docker Hub](https://hub.docker.com/repository/docker/sammcj/anz-test-2/)

### Requirements

To use the provided Makefile the following are required:

- `make`
- `jq`
- `docker`
- `git`

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

Run the application in Docker once built, this exposes the API at http://localhost:8000/version:
```
make run
```

### Test

TODO!


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

### Security

- I have integrated [WhiteSource Bolt](https://bolt.whitesourcesoftware.com/github/) to scan this code repository for potential security problems which will automatically created as [issues](https://github.com/sammcj/anz-test-2/issues) when detected.
- GitHub Security scanning is enabled on this repo, it is scanning the dependencies for vulnerable package versions.


## Future Improvements

I had very limited time to learn and build this, here a list of things that could be improved:

#### Reduction in Docker image size

I would need to do some more reading on what the minimal JS components to run the app are, from there it would be worth splitting it out into a multi-stage Dockerfile and only build in said files to the final image.

I did try the `-slim` node images, however there were issues and didn't have time to explore them further.

#### Fix tests

I started to read up on how Mocha and Chai testing works for but ran out of time while implementing the tests.