# mtu-coding-exam

## Introduction

This is my solution for [Montu's backend coding challenge](./challenge.pdf). 

My approach is to implement a client search to TamTam as an npm. The challenge is emphasizing clean typing and extensibility, so my focus will be to provide an interface for the search with a TamTam implementation that can be swapped out with another implementation.

The provided API key is expected to be found in an env var called `TAMTAM_API_KEY`. The TamTam search implementation should return an error if this is not present.

Create a `.env.sh` file like this:

```
export TOMTOM_API_KEY="XXX"

```

and run `npm run env` to load it.

## Notes 


https://www.npmjs.com/package/@tomtom-international/web-sdk-services <-- deprecated


Maybe write a smoke test that will pull down the npm and call the search?

https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly