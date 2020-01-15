# ANZx Test 2

The built Docker container exposes a HTTP API server on http://localhost:8000

It returns:

- The version (Read from version.txt).
- Last Commit SHA.
- A description of the application.

# Build

## Local build

You can build the application locally using Docker as follows:

```
docker build . -t anzxtest2:v1.0.0
```

## Travis build

The Travis build is configured in `.travis.yml`

Travis builds the application and runs some basic tests, at present Travis does not deploy the application.

# Run

```
docker run -p 8000:8000 anzxtest2:v1.0.0
```


# Test




# Example output

```
"myapplication": [
  {
    "version": "1.0",
    "lastcommitsha": "abc57858585",
    "description" : "pre-interview technical test"
  } ]
```