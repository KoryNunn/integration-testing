# Unit testing in node

A description of how I've done it before

# Overview

We (myself and colegues) have previously used unit tests for our large projects
and have generally found them to be quite brittle, since the business logic for
a service is often less volatile than the code that implements it.

We have had good success using integration testing that tests the whole service
from it's real interface (be it REST, sockets, whatever), down to a clone of the
database that it uses.

# Tools

 - tape (or similar)
    Tape is a very simple assersion lib that outs `tap`.

    It does has its problems, as tape is designed to run ASAP, and therefor in
    parallel. Because tape is quite simple, there are ways around this.

 - righto (or similar)
    Righto is an eventual-like implementation that lets you define eventually
    resolved values, how to resolve them, and allows them to be composed into
    a resolveable dependency tree.

    TL;DR, you need two `User`s, and both `User`s depend on the existance of a
    `Company`, so you need to wait untill `Company` is ready before creating
    the `User`s, and you only want to create `Company` once. Righto makes this
    trivial.

 - make-json-request (or similar)
    A wrapper around `request` that makes it easier to make simple API requests.

# Architecture

## Initialise

When testing a service, you will need some form of initialisation step that does
something once for all tests, in the case of the example, starting the server.

## Setup

For each set of tests, you will probably want to destroy your database so that
you have a clean state to work from.

Each set of tests will also need the service to be in a certain state, with
certain objects pre-existing, like admin accounts, products, categories etc etc...

## Test

routes are called with any required data, and the response is tested via assersions.

## Teardown

With this architecture there is no teardown because the setup steps clear the DB.

## Example

[example test setup](/example)

The example service and tests are extremely contrived but can be used as a decent
demonstration of how this process can be used.