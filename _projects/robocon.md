---
layout: page
title: DD ROBOCON - Competition Robots
description: Two seasons in the Systems Programming division for India's premier collegiate robotics competition -- 8th nationally in 2024, 11th in 2023.
img: assets/img/projects/robocon/2024.jpeg
importance: 1
category: robotics
---

## What is ROBOCON?

DD ROBOCON is the Indian edition of the Asia-Pacific **ABU Robocon** competition -- the largest collegiate robotics contest in the region. Every year teams of undergraduates design and build robots from scratch to complete a themed challenge that changes annually, blending mechanical design, embedded control, and split-second strategy under a tight match clock.

I joined the SRM ROBOCON team in **September 2022** and worked in the **Systems Programming & Computer Engineering Division** across two seasons -- the side responsible for everything that ran code or carried a signal: drive control, wireless communication, motor control, sensing, and the vision/automation experiments.

---

## Season 2024: 8th Place Nationally -- "Harvest Day"

{% include figure.liquid loading="eager" path="assets/img/projects/robocon/2024.jpeg" class="img-fluid rounded z-depth-1" caption="Our two 2024 robots -- R1 (left) and R2 (right) -- at the ROBOCON 2024 national stage." %}

### The Challenge

The 2024 ABU theme, **Harvest Day**, was inspired by rice farming. It required two cooperating robots -- **R1** and **R2** -- to collect balls representing grain and deposit/shoot them into baskets and silos for points within the match window. R1 acts first in the paddy area and hands off to R2, which scores into the elevated targets.

### R1 -- Teleoperated Collector

R1 was driven over a custom **wireless link**: an **Arduino Nano** paired with an **NRF24L01** transceiver on the operator controller streamed commands to the robot. On the robot side I worked on:

- **Python motor control loops** running at fixed **25 ms and 100 ms** cadences for the drive and mechanisms.
- **Encoder feedback** read on the microcontroller and relayed over **UART** for closed-loop motion.
- **Servo easing** routines so the collection mechanisms moved smoothly instead of snapping between positions.

I also built a **vision-based line follower** as an automation experiment for R1 using a **ZED camera** and OpenCV -- perspective birds-eye warping of the track, then color-threshold detection tuned across **HSV, LAB, RGB, and HSL** color spaces to stay robust under the stadium's mixed lighting.

### R2 -- Autonomous Shooter

R2 ran in both **manual** and **autonomous** modes on **Raspberry Pi Pico** controllers (MicroPython). Key systems:

- **Heading-corrected drive**: an **HMC5883L magnetometer** provided absolute heading; I used it to keep the robot aligned and driving straight, with dedicated calibration and alignment routines.
- **Sensing**: **ultrasonic** rangers for wall-following and distance keeping, plus wheel **encoders** for odometry.
- **Ball detection**: a **TCS34725 color sensor** identified ball colors to decide what to pick and shoot.
- **Shooting & handling mechanisms**: a **BLDC** roller shooter, **stepper** and **DC** roller stages, and servos, driven through **L298N** and **PCA9685** PWM drivers.
- **Manual override**: a **Flysky** RC link decoded via the **iBUS** protocol for operator control when autonomy wasn't viable.

### Result

Competing against 120+ teams nationwide, SRM placed **8th nationally** -- our best finish, with the two-robot system executing the collect-and-score sequence on the national stage.

---

## Season 2023: 11th Place Nationally -- "Casting Flowers over Angkor Wat"

{% include figure.liquid loading="eager" path="assets/img/projects/robocon/2023.jpeg" class="img-fluid rounded z-depth-1" caption="Our 2023 robots at the ABU Asia-Pacific Robot Contest, New Delhi -- the Elephant Robot (left) and Rabbit Robot (right)." %}

### The Challenge

The 2023 ABU theme was set in Cambodia: two robots -- a **Rabbit Robot (RR)** and an **Elephant Robot (ER)** -- had to cooperate to pick up and toss **40 rings** onto **11 poles** in the central "Angkor Wat" area. Three pole types in different zones were worth different points (Type 3 highest), and the team scoring the most achieved **"Chey Yo"** and won. The ER had a larger size/weight allowance but was restricted from entering certain zones.

### Elephant Robot (ER)

- **Drive**: a **four-wheel mecanum drive** chosen for high traction, stability, and the ability to translate orthogonally without changing orientation.
- **Motor driver**: **Cytron MDDS30** (reliable PWM + direction control) -- after the Hercules drivers were discontinued and BTS7960 boards kept frying their LPWM line.
- **Control**: **Arduino**.
- **Shooting**: an integrated **pneumatic** system (an electromagnet approach was rejected for insufficient force).

### Rabbit Robot (RR)

- **Drive**: a **3-wheel omni drive in a T-shaped configuration** with two front castor wheels for stability -- chosen for space efficiency and orthogonal translation over Y-configs and differential drive.
- **Control**: **2x Raspberry Pi Pico** microcontrollers (a Raspberry Pi + PCA setup was abandoned after I2C-line and undervoltage failures; an Arduino Mega was rejected for lacking multi-threading).
- **Picking**: a **pulley mechanism** plus linkage -- it gave mechanical advantage and let us place actuators near the center of gravity for stability.
- **Feeding**: a **servo-with-rod** mechanism (DC-motor variants lost on position control or space).
- **Shooting**: a **pneumatic piston** for instant high force (roller and spring mechanisms didn't transfer enough energy to the hollow rings).
- **Actuators**: 1x pneumatic piston (throwing), 2x linear actuators (picking), and 3x offset-geared DC motors (picking + feeding).

### Hard Lessons in Sensing

The 2023 build taught me how brutal real competition conditions are: our **laser sensor failed on the day** because the stadium's overhead lighting washed it out, and we couldn't run encoders on the drive because a single Pico couldn't service three encoder channels reliably. These constraints -- and the resulting scramble -- directly shaped the more robust, magnetometer-and-encoder-based approach we took in 2024. We finished **11th nationally**.

---

## What ROBOCON Taught Me

ROBOCON was the formative experience of my undergraduate years. It taught me that the gap between "works on the bench" and "works on the field" is enormous, and that the gap is closed only by relentless testing. A laser sensor that's perfect in the lab dies under stadium lights; a Pico that handles two encoders chokes on three; a drive that's straight on tile drifts on competition flooring without a magnetometer to correct it.

More concretely, it gave me hands-on fluency in **embedded systems** (Raspberry Pi Pico, Arduino, MicroPython), **wireless control** (NRF24L01, Flysky/iBUS), **closed-loop motor control and PID**, **sensor integration** (magnetometers, encoders, ultrasonics, color sensors), and **OpenCV vision** -- the messy mechanical-electrical-software integration that defines real robotics.
