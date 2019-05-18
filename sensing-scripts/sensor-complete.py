# This file is intended to use all the sensors from the Sense HAT, 
#	and then write the data in JSON format to a series of files 
#	that are truncated based on DateTime
#
# The JSON format has been specifically chosen so that 
#	it can be easily parsed by data visualisation libraries
#

# define any variables used by this script here for code readability


# how long to sleep() during each while... loop
# measured in seconds, so this is a float
# Note: The sensors do better with a shorter interval, 
#	so don't make this any bigger than about 0.300
loopInterval =  0.100

# import the SenseHat library
from sense_hat import SenseHat

# import the time library which gives us sleep() 
import time

# instantiate new SenseHat object
sense = SenseHat()

# clear any existing readings
sense.clear()

# enable the three Inertial Motion Unit (IMU) sensors
sense.set_imu_config(True, True, True) # compass, gyroscope, accelerometer in that order


while True: 
	# sleep for an interval 
	# this is to help control the amount of data generated
	# and provides a rudimentary tuning mechanism
	time.sleep(loopInterval)	

	# temperature and pressure readings
	temperature = sense.get_temperature()
	print("temperature is: ", temperature)

	pressure = sense.get_pressure()
	print("pressure is: ", pressure)

	humidity = sense.get_humidity()
	print("humidity is: ", humidity)

	# IMU readings
	orientation = sense.get_orientation()
	pitch = orientation['pitch']
	roll = orientation['roll']
	yaw = orientation['yaw']
	print("orientation is: pitch {0} roll {1} yaw{2}".format(pitch, roll, yaw))

	acceleration = sense.get_accelerometer_raw()
	
	x = acceleration['x']
	y = acceleration['y']
	z = acceleration['z']

	x = round(x, 0)
	y = round(y, 0)
	z = round(z, 0)

	print("raw acceleration is: x={0} y={1} z-{2}".format(x, y, z))
