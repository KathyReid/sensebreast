# Working with the IMU

from sense_hat import SenseHat

sense = SenseHat()
sense.clear()

# enable all the things
sense.set_imu_config(True, True, True) # compass, gyroscope, accelerometer in that order


while True: 
	
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
