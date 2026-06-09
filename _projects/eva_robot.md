---
layout: page
title: EVA - Enhanced Virtual Assistant Humanoid Robot
description: A 1.72m autonomous humanoid robot fusing ROS2, omnidirectional SLAM navigation, 6-DOF manipulation, and an LLM-powered conversational stack. My B.Tech multidisciplinary major project.
img: assets/img/projects/eva/eva_interaction.jpg
importance: 1
category: robotics
---

{% include figure.liquid loading="eager" path="assets/img/projects/eva/eva_progression.png" class="img-fluid rounded z-depth-1" caption="From CAD to reality — EVA's build progression from frame to fully assembled 1.72m humanoid." %}

## Overview

**EVA (Enhanced Virtual Assistant)** is a full-scale **1.72-metre autonomous humanoid robot** built as my **B.Tech multidisciplinary major project** (Dec 2024 -- May 2025) with a five-member team spanning Mechanical, ECE, Mechatronics, and Computer Science. EVA recognises people, holds natural spoken conversations powered by a large language model, manipulates objects with two 6-DOF arms, and navigates autonomously on an omnidirectional drive — all orchestrated through **ROS2**.

The robot is an amalgamation of four engineering disciplines working as one system: **Mechanical** (skeletal fabrication), **Electronics** (CAN bus, custom PCBs), **Control Systems** (ROS2, SLAM, inverse kinematics), and **AI/NLP** (face recognition, speech, LLM reasoning, emotion classification).

> **My role:** I led the **ROS2 architecture, autonomous drive, path planning, and SLAM implementation** — the entire navigation and localization stack that lets EVA move through the world on its own.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/arch_system.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The complete control-systems architecture — Drive, Interface, and arm/neck mechanisms, each with their own controllers, drivers, and power buses.
</div>

---

## 1. Autonomous Drive, SLAM & Path Planning

This was my core contribution. EVA moves on a **four-wheel omnidirectional drive** powered by **4× Maxon 24V motors** that can translate and rotate in any direction simultaneously — essential for a tall humanoid that needs to reposition smoothly without turning its whole body.

The navigation stack is a layered ROS2 pipeline:

- **Sensing & SLAM**: **High-level processing** on an **NVIDIA Jetson AGX Orin** fuses a **2D LiDAR**, an **IMU (MPU6050)**, and **wheel encoders** feed the **SLAM Toolbox** in ROS2, which performs scan matching, pose estimation (fusing odometry + IMU), map updates, and loop closure to build and localize within a 2D occupancy grid.
- **Path planning** generates a collision-free route across the occupancy grid and emits velocity commands `cmd_vel (Vx, Vy, Ω)`.
- **Low-level control**: a **Raspberry Pi** drives the wheels through **Cytron motor drivers**, closing the loop with a **PID controller** (tuned to `Kp=19, Ki=3, Kd=0.5`) using encoder feedback. The drive runs off a dedicated 6S / 24V Li-ion bus.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/slam_pipeline.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/drive_cad.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: the full SLAM pipeline I built — from sensor acquisition through scan matching, pose estimation, map update, and loop closure. Right: the CAD of the omnidirectional drive base.
</div>

The early frame wobbled under counter-torque from the arm motors because the riveted aluminium channels had play between them. We **welded the entire skeleton** together, turning a flexible riveted frame into a rigid, robust chassis that holds calibration during motion.

---

## 2. The 6-DOF Arms

Each arm is a **6-DOF manipulator** with links machined from **aluminium, Delrin polymer, and PLA**. The four major joints — shoulder pitch, shoulder roll, bicep, and elbow — are driven by **BLDC motors** over a CAN bus, while a **Teensy** drives the forearm and wrist servos plus **6× N20 motors** per hand, with **flex sensors** on the fingers for closed-loop grip feedback.

The arm software follows a clean ROS2 motion pipeline — **URDF model → SRDF configs → RViz simulation → MoveIt planning → 6-DOF inverse kinematics → joint-state publishing**. Joint targets travel from the **Jetson Orin AGX** to a **Raspberry Pi**, then out over a **Waveshare dual CAN HAT** across two CAN buses (CAN0/CAN1) to the joint controllers.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/arm_flow.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/arm_cad.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: the arm control flow from ROS2/MoveIt down to per-joint CAN actuation and N20 finger control. Right: the 726mm 6-DOF arm CAD.
</div>

We verified the kinematics by building the full **DH-parameter table** and computing forward/inverse kinematics through homogeneous transformation matrices, validating the end-effector pose against the physical arm before trusting MoveIt trajectories on hardware. I also designed and printed **custom PCBs** to consolidate the per-joint wiring and CAN transceivers.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/rviz_sim_for_gestures.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/real_arm.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: RViz simulation of EVA performing gestures, validated before deployment. Right: the fabricated 6-DOF arm on the robot.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/pcb_arms.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/Inverse_kinematics_Arms.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: the custom-designed and printed PCBs for the arms. Right: the DH-parameter table and forward/inverse kinematics computation.
</div>

---

## 3. Conversational AI & NLP

EVA's dialogue stack lets a person simply walk up and talk:

1. **Face Recognition** — the **InsightFace** library with a **ResNet** backbone matches visitors against a database built from SRM faculty-finder images, greeting known people by name via cosine-similarity matching on stored embeddings.
2. **Speech Recognition** — audio is captured through a **Samson microphone array** (16 kHz, 16-bit) and transcribed with **Whisper**.
3. **Reasoning** — a **Llama-3** LLM interprets the request. A tool-routing layer decides whether to answer directly, hit **SerpAPI** for live web search, or query **Google Maps** for navigation and directions.
4. **Text-to-Speech** — responses are voiced through **gTTS**.
5. **Emotion Classification** — a **DistilRoBERTa** model classifies the conversation into seven emotions (anger, disgust, fear, joy, neutral, sadness, surprise), which drive EVA's facial expression.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/ai_nlp_eva.png" class="img-fluid rounded z-depth-1" caption="The complete AI/NLP flow: face recognition, Whisper speech, Llama-3 reasoning with tool routing, gTTS speech, and emotion classification." %}
    </div>
</div>

---

## 4. The Animatronic Face

EVA's personality lives on a **screen-based animated face**. Rather than mechanical eyebrows, a curved display renders an expressive set of eyes and mouth that shift with the emotion classifier's output — a warm blue smile when the conversation is friendly, changing in real time as the dialogue's tone changes. Paired with the depth camera and microphone mounted just below, it makes EVA feel approachable rather than industrial.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/eva_face.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/eva_interaction.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    EVA's expressive display, depth camera, and microphone array (left), and a visitor interacting with the robot face-to-face (right).
</div>

---

## 5. Mechanical Design & Fabrication

The skeleton is built from **19×19 mm square aluminium channels** joined by **laser-cut 3 mm aluminium plates**. The body stands **1720.8 mm** tall on a **606 mm** wide base. Fabrication spanned **material selection, torque calculations, FDM/SLA 3D printing, CNC milling, welding, and laser cutting** — a genuinely cross-disciplinary build effort.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/eva/eva_cad.png" class="img-fluid rounded z-depth-1" caption="Full-body CAD — 1720.8 mm tall, 606 mm wide, on a 603 mm omnidirectional drive base." %}
    </div>
</div>

---

## Demo

{% include video.liquid path="assets/img/projects/eva/eva_demo.mp4" class="img-fluid rounded z-depth-1" controls=true muted=true loop=true autoplay=true %}
<div class="caption">
    Integrated demonstration — EVA recognising, conversing, and operating its arms and drive together.
</div>

---

## What I Learned

Leading the navigation stack on a 1.72m humanoid taught me how unforgiving real hardware is. SLAM that looks perfect in RViz drifts the moment a welded joint flexes or an IMU heats up; a perfectly planned A\* path is useless if the inverse kinematics and PID loop on the Teensy can't track `cmd_vel` cleanly. The biggest lesson was **systems integration** — getting the Jetson, Raspberry Pi, Teensy boards, CAN bus, and a dozen ROS2 nodes to behave as one coherent robot in real time, on constrained hardware, in a noisy real-world room. That experience shaped how I approach every complex engineering system since.
