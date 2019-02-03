#define trigPin 11
#define echoPin 12
#define trigPin1 9
#define echoPin1 8

void setup() {
  Serial.begin (115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);

}

void loop() {
  long duration, distance;
  long duration1, distance1;
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2)/29.1;

  duration1 = pulseIn(echoPin1, HIGH);
  distance1 = (duration1/2)/29.1;

  /*if (distance >= 450 || distance <= 0){
    Serial.println("Out of range");
  }
  else {*/
    Serial.print(distance);
    Serial.println(" cm -Sensor 1");

    Serial.print(distance1);
    Serial.println(" cm -Sensor 2");
  //}
  delay(500);
  
}
