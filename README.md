# SenseBreast 

## What is SenseBreast? 

SenseBreast is a Maker Project for CECS8001 - Lab, by Kathy Reid (@kathyreid on the Twitters, GitHub, IRC etc). 

It is designed to be an early prototype of a mastectomy prosthetic, and explores the concept of a _cyberphysical system_ by having both computing-based components - "the cybers" - and physical components that are placed in close proximity to the body - "the physical". 

_Side note: For an excellent discussion of context and personal vs public space, see:_ 

> Haber, J., Greening, M., Castellano, L., & Wheaton, P. Proxemic Conversational UI: Moving beyond simple conversation.
http://www.jonathanhaber.com/pub/gi2016.pdf

SenseBreast is open source under the Apache2 license, inspired by projects like OpenAPS. Because open source is an act of generosity - an act of contributing to the commons - a movement which is more than the sum of its individual contributions. 

## How do you build SenseBreast? 

These instructions are provided so that SenseBreast has a _reproducible build_. 

Where documentation for a step already exists, it is linked rather than being reproduced. 

### Requirements 

To build SenseBreast you will need: 

* Raspberry Pi 3B+
* Sense HAT
* Monitor with a HDMI connection and a HDMI cable 
* USB keyboard 
* 8GB or more Micro SD card and a way to write to the card (ie Etcher)
* Basic `bash` and `python` knowledge
* A source of battery power - I recommand a small form factor Li-Ion pack with a Micro-USB cable to go to the Raspberry Pi. _NOTE: Most of the power sources I tested resulted in 'under voltage' warnings on the RPi, but these are generally safely ignored._
* Coffee, patience, and when that fails, your favourite curse words. 

### Method

#### Raspberry Pi 

##### Flash the Raspbian operating system to the Micro SD card

* Flash the [Raspbian Stretch Lite operating system](https://www.raspberrypi.org/downloads/raspbian/) to your Micro SD card using a program like Etcher 
* To prove that you have a working Raspberry Pi with Rasbpian, connect the RPi to the monitor using a HDMI cable, and to the keyboard using the USB cable. Connect the RPi to a power source using the Micro USB cable. Once the RPi is powered on, you should see the device boot. Use the username `pi` and password `raspberry` to log in. If you can successfully log in, you are ready for the next steps. 

_NOTE: You will not have network access yet, that's the next step._

##### Connect to a network with internet access

There are two methods to do this. 

* You can use `sudo raspi-config` from the command line, then choose 


* Connect your RPi to the network in whatever way makes 
* Install [Sense HAT and the Python libraries for Sense HAT](https://www.raspberrypi.org/documentation/hardware/sense-hat/)


