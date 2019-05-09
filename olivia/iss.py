# -*- coding: utf-8 -*-
"""
Created on Mon Apr 29 15:14:42 2019

@author: Olivia
"""

import json        #this is unused but left in for testing
import requests
import random
import time
import wikipediaapi #this is unused but left in for testing


print("'quit' to exit \n'ISS' to find out how many people are currently in space.")
print("=" * 72)

s = ['']

while s[0] != "quit":
    try:
        #s = input("> ")
        #userInput = list(map(str.lower, input(">>> ").split()))
        s = list(map(str.lower, input("> ").split()))
    except EOFError:
        s[0] = "quit"
    time.sleep(random.uniform(0.1, 0.4))
    
        
    if s[0] == "iss":
        # Get the response from the API endpoint (Open Notify).
        response = requests.get("http://api.open-notify.org/astros.json")
        ISSpeople = response.json()
        
        print("There are currently " + str(ISSpeople["number"]) + " people on the ISS.")
        print("\nThey are: ")
        
        for person in ISSpeople['people']:
            print(person['name'])

