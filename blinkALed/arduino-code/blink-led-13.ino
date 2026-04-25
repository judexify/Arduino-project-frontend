int ledPin = 13;
String command = "";

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '\n') {
      command.trim();

      if (command == "ON") {
        digitalWrite(ledPin, HIGH);
      } 
      else if (command == "OFF") {
        digitalWrite(ledPin, LOW);
      }

      command = ""; // reset
    } else {
      command += c;
    }
  }
}
