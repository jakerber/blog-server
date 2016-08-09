#!/bin/bash

# credit to Tim Tregubov
# shell script from cs52.me/assingments/hw5p1
# mongoshell is a commandline interface to your local mongo db

show dbs
# will show your current databases

use mytest
# will make mytest the current database

db.buildings.insert(
   {
      "address" : {
         "street" : "9 Maynard",
         "zipcode" : "03755",
         "building" : "Sudikoff",
         "coord" : [ -72.2870536, 43.7068466 ]
      },
      "dept" : "CS",
   }
)
# will insert an object into the database
# into a collection called buildings

db.buildings.find()
# returns everything in this collection

db.buildings.insert(
   {
      "address" : {
         "street" : "2 E Wheelock St",
         "zipcode" : "03755",
         "building" : "Hopkins Center For the Arts",
         "coord" : [ -72.2901329, 43.7020189 ]
      },
      "dept" : "Hop",
   }
)
# add in another entry

db.buildings.find({"address.building": "Sudikoff"})
# finds a entry in database by nested key:value
