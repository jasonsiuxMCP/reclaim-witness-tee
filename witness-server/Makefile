# Makefile for Reclaim Witness TEE Image (GHCR)

# Replace with your GitHub username if different
GITHUB_USER ?= likwidholly
IMAGE_NAME := ghcr.io/$(GITHUB_USER)/reclaim-witness-tee
TAG := latest

.PHONY: all build push

all: build push

build:
	@echo "Building Docker image: $(IMAGE_NAME):$(TAG)"
	docker build -t $(IMAGE_NAME):$(TAG) -f Dockerfile.tee .

push:
	@echo "Pushing to GHCR: $(IMAGE_NAME):$(TAG)"
	docker push $(IMAGE_NAME):$(TAG)

# Helper: Build EIF (if nitro-cli available locally)
eif:
	@echo "Converting to EIF for AWS Nitro..."
	nitro-cli build-enclave --docker-uri $(IMAGE_NAME):$(TAG) --output-file witness.eif

login:
	@echo "Please ensure you have a GitHub PAT with 'write:packages' scope"
	echo "${GITHUB_TOKEN}" | docker login ghcr.io -u $(GITHUB_USER) --password-stdin
