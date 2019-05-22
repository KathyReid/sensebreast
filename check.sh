#!/usr/bin/env bash

# This script runs all of the tools I recommend.
# It errs on the side of strictness - automatically fixing as much
# as possible, and complaining about any remaining slight issues.
# It's designed to be useful both locally, and in CI.

# Step One: automatic fixes.  Best to keep this!
autoflake --recursive --in-place \
    --remove-all-unused-imports --remove-duplicate-keys \
    --remove-unused-variables .
pyupgrade --py36-plus $(find . -name '*.py')
isort --recursive --apply \
    --multi-line=3 --force-grid-wrap=2 --lines=88 \
    --trailing-comma --combine-as .
black --target-version=py36 .

# Step Two: static analysis (automated code review)
flake8 --ignore=D,E501,W503  # configure to match Black
#mypy .  # Mypy is much more opinionated, and thus optional

# Step Three: running your tests.
# You'll need to *write* tests for this to be useful, of course.
# I use pytest to run tests, and Hypothesis to write them!
# Once you've got tests, un-comment the coverage options in `pytest.ini`
pytest
