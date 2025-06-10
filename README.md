# mtu-coding-exam

## Introduction

This is my solution for [Montu's backend coding challenge](./challenge.pdf). 

My approach was to implement a client search to TamTam as an npm.

At first I was hoping my client could leverage [TomTom's SDK](https://www.npmjs.com/package/@tomtom-international/web-sdk-services), especially for types, but I found it was deprecated. I ended up using Claude.ai to generate the TomTom types in [index.ts](./src/index.ts) by copying their [API documentation about the response](https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search#response-data); this was to alleviate the drudgery of all that typing and I thought it was an appropriate use of an LLM in a coding exercise. These types are namespaced under 'TomTom'. 

Two top level interfaces that would belong to QuickRoute are exposed holding `Address` and `Search` types. QuickRoute can create as many implementations of `Search` as needed to accomodate other address search APIs and return the `Address` model each time as an array, so no need for the underlying types representing the provider to leak out of my client library. I thought that was simplest.

## Installation

You can pull down the npm using: 
```
npm i git+https://github.com/nicholasf/mtu-coding-exam.git
```

Or otherwise clone the source:

```
git clone https://github.com/nicholasf/mtu-coding-exam.git
```

## Testing

```
npm run build
npm test
```

The tests use a [fixture](./test/fixtures/422collins.json) generatd by [nock](https://github.com/nock/nock?tab=readme-ov-file#recording). So I had nock record a valid and invalid request to TomTom then stored those fixtures to replay later in tests. 

There is also a small project [MTU Harness](https://github.com/nicholasf/mtu-harness) which pulls down the [MTU Coding Exam](https://github.com/nicholasf/mtu-coding-exam) and ensures that it can run it as a shareable library with exportable types.

Thanks!