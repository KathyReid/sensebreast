# initial go at sensing the environment from the RPi

# import SenseHat library
from sense_hat import SenseHat

sense = SenseHat() #instantiate new SenseHat object
sense.clear() # clear any previous readings 


while (True):
	temp = sense.get_temperature()
	print ("temperature is: ", temp)
	
	pressure  = sense.get_pressure()
	print("pressure is: ", pressure)

	humidity = sense.get_humidity()
	print("humidity is: ", humidity)

	



