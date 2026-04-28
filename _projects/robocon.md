---
layout: page
title: DD ROBOCON - Autonomous Competition Robots
description: Two years leading the Systems Programming division for India's premier robotics competition. 8th nationally in 2024, 11th in 2023.
importance: 1
category: robotics
---

## What is ROBOCON?

DD ROBOCON is the Indian edition of the Asia-Pacific ABU Robocon competition -- the largest and most prestigious collegiate robotics contest in the country. Each year, teams of undergraduates design and build robots from scratch to complete a themed challenge that changes annually. The challenge always involves autonomous elements, mechanical ingenuity, and split-second strategy under a 3-minute clock.

I joined the SRM ROBOCON team in September 2022 and was promoted to **Systems Programming & Computer Engineering Division Lead** for the 2023-2024 cycle. Over two seasons, my division was responsible for everything that had a circuit or ran code: perception, autonomy, communication, motor control, and sensor fusion.

---

## Season 2024: 8th Place Nationally

### The Challenge

The 2024 theme required building an **autonomous robot** capable of:
- Visually identifying specific objects on the playing field
- Navigating to them, picking them up with a gripper
- Making strategic decisions about which objects to collect and in what order
- Placing objects at designated targets

This was not just a remote-controlled robot with a claw. The rules demanded genuine autonomy: the robot had to perceive, decide, and act without human input during key phases of the match.

### Vision-Based Perception

I trained a **YOLOv5 instance segmentation** model on a custom dataset of **7,000+ hand-labeled images** of the game objects in various lighting conditions, angles, and occlusion levels. The model ran on an NVIDIA Jetson Orin Nano at **30 FPS**, providing real-time bounding boxes and segmentation masks.

The tricky part was not detection -- it was **robust detection**. Competition arenas have unpredictable lighting (fluorescent, spotlight, mixed). I built a preprocessing pipeline that applied adaptive histogram equalization and white-balance correction before inference. During dry runs, this preprocessing step alone improved detection recall from 78% to 94% under worst-case lighting.

### The AI Decision Engine

The robot needed to decide *which* objects to pursue, in *what order*, given the current game state (time remaining, opponent positions, objects already collected). I built a **ROS2-based rule-driven AI system** that combined:

1. **NLP-parsed rule book**: I encoded the competition rules as a structured knowledge base so the decision engine could reason about point values and penalties.
2. **Computer vision state estimation**: The YOLOv5 output, combined with odometry, maintained a real-time map of object locations.
3. **Greedy planning with lookahead**: A cost function weighted distance, point value, and risk (probability of dropping an object) to rank targets. The robot re-planned every 2 seconds as the world state changed.

### Motion & Control

The mechanical platform used **mecanum wheels** for omnidirectional movement. I implemented:

- **Inverse kinematics** for the mecanum drivetrain, mapping desired (vx, vy, omega) to individual wheel speeds
- **Odometry** from wheel encoders fused with IMU data via a complementary filter for dead-reckoning between vision updates
- **Occupancy grid mapping** from LiDAR for obstacle avoidance
- **CAN bus networking** connecting the main computer, motor controllers, gripper actuators, and sensor nodes into a reliable, low-latency communication backbone

The CAN network was essential. Previous years' teams had used serial daisy chains that introduced variable latency. CAN gave us deterministic 1-ms message delivery, which was critical for the PID control loops running at 200 Hz.

### The Gripper

The robotic gripper used a pneumatic actuation system with force-sensing resistors on the fingers. I wrote the firmware (Embedded C on an STM32) that implemented a grasp-force control loop: the gripper closes until the force sensors detect a threshold, then holds at that force to avoid crushing the object. Grasp success rate during testing was 96%.

### Results

We competed against 120+ teams from across India and placed **8th nationally**. The robot completed all autonomous tasks in the qualifying rounds and maintained consistent performance throughout the elimination bracket.

---

## Season 2023: 11th Place Nationally

### A Different Challenge, A Different Robot

The 2023 theme was a **semi-autonomous** challenge requiring cooperation between a manually controlled robot and an autonomous one. My work focused on the autonomous bot:

- **Low-latency NRF controllers**: Custom wireless communication between the operator console and the robot using nRF24L01+ modules. I achieved <5 ms round-trip latency by implementing a custom protocol layer with CRC error checking and automatic retransmission.
- **PID tuning**: The 2023 bot used a differential drive with high-torque DC motors. I implemented cascaded PID control (outer loop: position, inner loop: velocity) and tuned all gains experimentally using step-response analysis.
- **Real-time sensor-actuator optimization**: Ultrasonic rangers and IR proximity sensors fed into a reactive obstacle-avoidance layer that overrode path-planner commands when an imminent collision was detected.
- **Self-balancing bot**: I also built a two-wheeled self-balancing robot prototype as a development exercise, implementing a complementary-filter-based IMU and a PD balance controller.

We placed **11th nationally** -- a strong result for a team rebuilding its software stack from scratch.

---

## Side Projects from ROBOCON

Beyond the competition robots, the ROBOCON environment pushed me to build several sub-projects:

- **Line-follower robot**: A PID-controlled bot using an IR sensor array. Used as a training exercise for new team members.
- **Camera-based object-tracking system**: A pan-tilt camera rig that locks onto and follows a colored object using OpenCV contour detection and PID-controlled servos. Frame rate: 60 FPS.
- **CAN bus analyzer tool**: A Python+Tkinter GUI that sniffs and decodes CAN traffic in real time, invaluable for debugging the robot's communication bus during integration.

---

## What ROBOCON Taught Me

ROBOCON was the formative experience of my undergraduate career. It taught me to build systems that work under pressure -- literally, under a 3-minute competition clock with judges watching. It taught me that the gap between "works on the bench" and "works on the field" is enormous, and that gap is closed by testing, testing, and more testing.

More concretely, it gave me deep fluency in ROS2, embedded systems (STM32, Arduino, Raspberry Pi), real-time control theory, computer vision deployment on edge devices, and the mechanical-electrical-software integration that defines real robotics. Every internship I've landed since -- Samsung, Nokia, IIT Madras, Düsseldorf -- has drawn on skills I first developed in the ROBOCON workshop.
