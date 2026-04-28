---
layout: page
title: EVA - Enhanced Visitor Assistant Robot
description: A fully autonomous campus robot combining ROS2, SLAM, LLM-powered conversation, face recognition, and an animatronic face for human-like interaction.
importance: 1
category: robotics
---

## The Problem

University campuses are sprawling, confusing places for first-time visitors. Information desks are understaffed, signboards are outdated, and campus maps are difficult to read on the move. We asked a simple question: *what if a robot could walk up to you, recognize you, answer your questions in natural language, and physically guide you to your destination?* That question became EVA.

## What EVA Actually Is

EVA is a full-stack autonomous visitor assistant robot built as my **B.Tech major project** (December 2024 -- May 2025). It is not a chatbot on wheels. It is a system that simultaneously runs real-time SLAM for navigation, a multi-camera perception pipeline for face and object recognition, a large-language-model backend for contextual conversation, and a servo-driven animatronic face that mirrors human expressions during dialogue. Everything is orchestrated through **ROS (Robot Operating System)**.

The robot was designed from the ground up -- mechanical CAD, custom URDF model for simulation, embedded firmware for actuators, and a layered software architecture that separates perception, planning, dialogue, and expression into independent ROS nodes communicating over topics and services.

---

## Technical Deep Dive

### 1. Mechanical Design & URDF Model

The physical platform uses a differential-drive base with two powered wheels and a caster. On top sits a torso housing compute hardware (Jetson + Raspberry Pi), a 2-DOF robotic arm for pointing gestures, and the animatronic head. I authored a complete **URDF (Unified Robot Description Format)** model so that every joint, link, collision mesh, and inertia tensor is specified. This URDF is loaded into **Gazebo** for simulation and into **RViz** for live visualization of sensor data and TF frames during real-world operation.

The robotic arm initially suffered from visible stuttering and mechanical backlash when moving between poses. I traced the root cause to slop in the worm-gear transmission and overshoot in the PID position controller. The fix was two-fold: I replaced the worm gears with a planetary gear reduction that eliminated backlash, and I re-tuned the PID gains using Ziegler-Nichols with a feed-forward term to smooth trajectories. Post-fix, the arm tracks waypoints within 2 degrees of commanded position with no perceptible judder.

### 2. Autonomous Navigation -- SLAM & Path Planning

EVA maps unknown environments and localizes itself within them using **gmapping** (a Rao-Blackwellized particle filter SLAM) fed by a 2D LiDAR and wheel odometry. Once a map exists, the robot switches to **AMCL** (Adaptive Monte Carlo Localization) for ongoing pose estimation.

Path planning is handled by the **Nav2** stack in ROS2. The global planner (Dijkstra / A*) produces a collision-free path on the occupancy grid, and the local planner (**DWB** -- Dynamic Window Approach) generates smooth velocity commands that respect kinematic constraints while dodging dynamic obstacles detected by the LiDAR in real time.

I tuned the costmap inflation radius and the DWB scoring parameters extensively during corridor tests -- getting the robot to hug walls at a comfortable distance while still passing through standard-width doorways took several iterations.

### 3. Perception Pipeline

EVA runs multiple perception modules concurrently:

- **Face Recognition**: A camera on the head captures frames, which are processed by a face-detection model (MTCNN) followed by a FaceNet embedding extractor. Known faces are matched against an enrolled database using cosine similarity. When EVA spots a recognized visitor, it greets them by name -- a small touch that makes interactions feel personal.
- **Object Detection**: A YOLOv5 model identifies common campus objects (doors, elevators, notice boards, people) to enrich situational awareness. This feeds into the dialogue system so EVA can say things like "The elevator is right behind you."
- **Depth Estimation**: A stereo camera provides depth data that supplements the LiDAR for obstacle avoidance in the vertical plane (e.g., overhanging signs).

All perception outputs are published as ROS topics and fused in a central state manager that maintains an internal world model.

### 4. Conversational AI -- Whisper + LLaMA + RAG

EVA's dialogue system is the most ambitious subsystem. The pipeline works as follows:

1. **Speech-to-Text**: OpenAI **Whisper** (medium model, running locally on the Jetson) transcribes visitor speech in real time. I optimized the model with INT8 quantization to keep latency under 1.5 seconds for a typical utterance.
2. **Intent + Context**: The transcript is sent to a **LLaMA**-based language model fine-tuned on university-specific data -- department locations, faculty office hours, event schedules, campus policies. I built a **Retrieval-Augmented Generation (RAG)** layer on top: the query is embedded, matched against a FAISS vector store of university documents, and the top-k retrieved chunks are injected into the LLaMA prompt as context.
3. **Response Generation**: LLaMA generates a natural-language response. A post-processing step extracts any navigation targets (e.g., "the library") and converts them to map coordinates for the planner.
4. **Text-to-Speech**: The response is spoken through a speaker using a neural TTS engine.

The end-to-end latency from the visitor finishing a sentence to EVA starting its reply is approximately **2.5 seconds** -- fast enough to feel conversational.

### 5. The Animatronic Face

This is what makes EVA memorable. The head contains 6 micro-servos controlling eyebrows (2 DOF), eyelids (2 DOF), and mouth corners (2 DOF). A lightweight emotion classifier runs on the audio stream (reusing my Samsung R&D ECAPA-TDNN work) and maps detected emotions to facial expressions. When the visitor sounds confused, EVA furrows its brows; when the visitor laughs, EVA smiles. The expressions are synchronized with the TTS output so the mouth moves in time with speech.

The servo control runs on a dedicated Arduino Mega communicating with the Jetson over serial (rosserial). Update rate is 50 Hz, which is sufficient for smooth, natural-looking motion.

---

## Architecture Summary

```
Visitor speaks
    ↓
Whisper STT → transcript
    ↓
RAG retrieval (FAISS + university docs)
    ↓
LLaMA inference → response text + navigation target
    ↓                          ↓
Neural TTS → speaker     Nav2 goal → autonomous drive
    ↓
Emotion classifier → animatronic face servos
```

All modules run as ROS2 nodes. The system is launched from a single `ros2 launch` file.

---

## Results & Current Status

- Successfully navigated a 3-floor university building autonomously during live demos
- Recognized 50+ enrolled faces with >95% accuracy
- Handled multi-turn conversations about campus information with contextually accurate responses
- Animatronic expressions were rated "surprisingly lifelike" by test visitors

---

## What I Learned

Building EVA forced me to work across the entire stack -- from machining gears to fine-tuning LLMs. The hardest part was not any single module but making them all work together in real time on constrained hardware. I gained deep practical experience with ROS2 lifecycle management, Jetson GPU scheduling, real-time embedded control, and the messy reality of deploying AI models outside the lab.
