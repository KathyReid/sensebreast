# SenseBreast 

- [SenseBreast](#sensebreast)
  * [What is SenseBreast?](#what-is-sensebreast-)
  * [How do you build SenseBreast?](#how-do-you-build-sensebreast-)
    + [Requirements](#requirements)
    + [Method](#method)
      - [Raspberry Pi](#raspberry-pi)
        * [Flash the Raspbian operating system to the Micro SD card](#flash-the-raspbian-operating-system-to-the-micro-sd-card)
        * [Set the localisation for your preferred keyboard layout](#set-the-localisation-for-your-preferred-keyboard-layout)
        * [Connect to a network with internet access](#connect-to-a-network-with-internet-access)
        * [Install `git` and clone this repo](#install--git--and-clone-this-repo)
        * [A little `.bashrc` hack for making `ls` much nicer](#a-little--bashrc--hack-for-making--ls--much-nicer)
        * [Symlinking the `wpa_supplicant.conf` file](#symlinking-the--wpa-supplicantconf--file)
        * [Install the `sense-hat` package for Raspbian](#install-the--sense-hat--package-for-raspbian)
      - [Using sensors](#using-sensors)
    + [Prosthetic form](#prosthetic-form)
    + [Future directions for development](#future-directions-for-development)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


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
* To prove that you have a working Raspberry Pi with Rasbpian, connect the RPi to the monitor using a HDMI cable, and to the keyboard using the USB cable. Connect the RPi to a power source using the Micro USB cable. On the first boot, the RPi will display "resizing file system, rebooting in 5 seconds...". Once the RPi is powered on, you should see the device boot. Use the username `pi` and password `raspberry` to log in. If you can successfully log in, you are ready for the next steps. 

_NOTE: You will not have network access yet, that's the next step._

##### Set the localisation for your preferred keyboard layout

By default, the RPi ships with the `en-GB` keyboard layout, which has several different key settings, like the `@` symbol and `#` symbol aren't where they are on an Australian keyboard. To set localisation options, type `sudo raspi-config` at the command line, then choose `4 - Localisation option`. If you're Australian, choose `en-AU`, then set this as the default `LOCALE`. Then, set the keyboard layout to `English-Australian` by typing `sudo raspi-config`, then choosing `4 - Localisation options` then `I3 Change Keyboard Layout`. 

This will make you life easier when manually typing configurations. 

##### Connect to a network with internet access

_NOTE: This is the hardest step in hardware setup. Do not underestimate how difficult this step is. Here be dragons._

There are two methods to do this. 

* You can use `sudo raspi-config` from the command line, then choose `2 - Network options` and enter the details for your network. 

Chances are though that you're on a secure, PEAP-authenticated network, in which case this method won't work and you'll need to manually edit the `wpa_supplicant.conf` file. This is an exercise in pain, misery and the limits of caffeine tolerance, so the repo includes a sample `wpa_supplicant.conf` to protect your sanity. The tutorial [here](https://www.raspberrypi.org/forums/viewtopic.php?t=111100) shows you how to generate a password hash for PEAP authentication. 

* `cd /etc/wpa_supplicant`
* `sudo mv wpa_supplicant.conf wpa_supplicant.conf.BAK` # this makes a copy of the existing file in case of borkage
* `sudo nano wpa_supplicant.conf` 

Then, edit the wpa_supplicant.conf with the details relevant for your network. Use `Ctrl + X` to save. Type `sudo reboot now` on the command line to reboot. 

If you have a working `wpa_supplicant.conf` file then you will be able to proceed and install other components, otherwise you will be blocked until you can get `wpa_supplicant.conf` working. 

##### Install `git` and clone this repo

`git` will make setting up the SenseBreast a lot easier, because you can pull down this repo and a lot of the associated files. 

`sudo apt-get install git`

Then, we clone this repo: 

`git clone https://gitlab.cecs.anu.edu.au/u6933485/sensebreast/`

You will be asked for your ANU CECS GitLab username and password. 

_NOTE: If you have 2FA enabled on the CECS GitLab, remember to use your token instead of your raw password._

##### A little `.bashrc` hack for making `ls` much nicer 

`sudo vi ~/.bashrc`

Use the `/` key and enter `alias`. 

In the block of aliases, add: 

`alias ls='ls -las'`

Then use `:wq` to write and quit. 

Type `exit` then log in again, and when you use `ls` it will give you verbose information. Very helpful for development purposes. 

##### Get `nano` to do proper syntax highlighting

If you're doing any development work on the SenseBreast using the `nano` editor, then you will want to create and edit a `.nanorc` file in the `pi` user's home directory. 

An example `.nanorc` is included in the repo, which includes Python and bash syntax highlighting. 

```bash
include /usr/share/nano/sh.nanorc
include /usr/share/nano/python.nanorc
```

##### Symlinking the `wpa_supplicant.conf` file

Once you have the repo down, you can symlink `wpa_supplicant.conf` to make your life easier. 

```
cd /etc/wpa_supplicant
sudo rm wpa_supplicant.conf
sudo ln -s /home/pi/sensebreast/wpa_supplicant.conf wpa_supplicant.conf
```

This means that you can make changes to `wpa_supplicant.conf` in `git` such as adding a new network, and when you update the `sensebreast` repo using `git pull`, you will bring the changes down automagically. 


##### Install the `sense-hat` package for Raspbian

* Install [Sense HAT and the Python libraries for Sense HAT](https://www.raspberrypi.org/documentation/hardware/sense-hat/). The Python libraries are installed by installing the `sense-hat` package - you don't have to install something separate. 


#### Using sensors 

##### Calibrate the sensors using `octave`

* Follow the [instructions on the Sense HAT website](https://www.raspberrypi.org/forums/viewtopic.php?f=104&t=109064&p=750616#p810193) or [this forum post](https://www.raspberrypi.org/forums/viewtopic.php?f=104&t=109064&p=750616#p810193) to calibrate the sensors. 

* The files in the `sensing-scripts` directory use Python to take readings from the Sense HAT. 




### Prosthetic form 


### Future directions for development


### Disk image of SenseBreast



