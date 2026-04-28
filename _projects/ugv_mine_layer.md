---
layout: page
title: UGV Anti-Tank Mine Laying System
description: A semi-autonomous Unmanned Ground Vehicle designed and field-tested in collaboration with the Indian Army for automated anti-tank mine laying operations. Top 30 out of 260+ innovations at Northern Command Inno Yodha 2025-26.
importance: 1
category: robotics
---

## The Mission

Anti-tank mine laying is one of the most dangerous tasks in military engineering. Soldiers must manually dig, place, and camouflage mines in forward areas -- often under threat of enemy fire, in extreme terrain, and in brutal weather conditions. The 19 Engineer Regiment of the Indian Army approached us with a clear challenge: *can you build a machine that does this autonomously, so our soldiers don't have to?*

From May to July 2025, I led an 8-member team to design, fabricate, and field-test a semi-autonomous UGV (Unmanned Ground Vehicle) capable of executing the complete mine-laying sequence -- ground excavation, mine placement, and camouflage -- without putting a single soldier in the blast zone.

---

## The Three-Stage Autonomous Pipeline

The core engineering challenge was coordinating three fundamentally different mechanical operations into a single continuous autonomous workflow:

### Stage 1: Ground Excavation

The UGV carries a front-mounted excavation module with a hydraulically actuated digging arm. The arm uses a combination of a rotating auger for soft terrain and a pneumatic chisel for hard-packed or frozen ground. A depth sensor array ensures the excavation reaches the required depth for the specific mine type being deployed. The entire excavation sequence -- approach, position, dig, clear debris -- is fully autonomous once a target location is designated.

### Stage 2: Mine Placement

After excavation, a conveyor-and-gripper mechanism retrieves a mine from the onboard magazine (capacity: multiple mines per sortie) and places it in the excavated hole with sub-centimeter precision. The placement arm uses force-torque sensing to confirm proper seating and orientation. The mine's arming sequence is initiated only after placement verification passes all safety checks.

### Stage 3: Camouflage

The final stage sweeps loose soil and debris back over the placed mine using a rear-mounted blade-and-brush assembly. A surface-texture camera compares the camouflaged area against the surrounding terrain and makes additional passes if the concealment score falls below threshold. The goal is to leave zero visual signature detectable from ground level.

---

## Embedded Control Architecture

I designed the full embedded control system that enables both autonomous and semi-autonomous operation:

- **Central controller**: An ARM Cortex-M7 running FreeRTOS manages the state machine governing the three-stage pipeline. Each stage has explicit entry/exit conditions and safety interlocks.
- **Wireless command link**: 2 km operational radius using a custom RF protocol with AES-128 encryption and automatic frequency hopping. The operator can override any autonomous action at any time via a ruggedized control station.
- **Sensor fusion**: GPS/INS for navigation, LiDAR for obstacle detection, ground-penetrating radar for subsurface hazard avoidance, and a stereo camera pair for terrain classification.
- **Power management**: A hybrid battery system with hot-swap capability enables continuous operation during extended missions. The power controller dynamically allocates current between locomotion, actuators, and compute based on the current pipeline stage.

---

## Field Testing

The UGV was field-tested in three operationally representative environments:

- **Ladakh (sub-zero high altitude)**: Tested excavation performance in frozen ground at -15C. The pneumatic chisel system performed within specification; hydraulic fluid viscosity required a pre-heating cycle that we added to the startup sequence.
- **Rajasthan (desert)**: Tested in loose sand where the auger excavation approach outperformed the chisel. Camouflage scoring was highest here due to the uniform terrain texture.
- **Punjab (mixed terrain)**: The most challenging test -- variable soil composition within a single sortie required the system to dynamically switch between excavation modes based on real-time torque feedback from the digging arm.

---

## Competition & Recognition

The project was presented at the **Northern Command Inno Yodha Competition 2025-26**, a military innovation competition organized by the Indian Army's Northern Command. We were **selected among the Top 30 out of 260+ submitted innovations** -- a significant achievement given that competing entries came from defense research labs, established startups, and senior engineering teams.

The Army's feedback focused on the practical viability of our approach: the autonomous three-stage pipeline eliminates the need for soldiers in the blast zone, and the 2 km wireless radius provides a substantial safety margin. They expressed interest in continued development toward a field-deployable prototype.

---

## What I Learned

This was the most cross-disciplinary project I've ever led. It required simultaneous expertise in mechanical design (hydraulics, pneumatics, structural analysis), embedded systems (real-time control, wireless communication, sensor fusion), AI (terrain classification, autonomous navigation), and military operations (mine-laying doctrine, safety protocols, field conditions). Managing an 8-person team across these domains while meeting a hard demo deadline taught me more about engineering leadership than any classroom ever could.

The Ladakh field test was the defining moment -- watching our robot dig into frozen ground at 4,500 meters elevation, place a dummy mine, and camouflage it while we stood 500 meters away in safety. That's what engineering is for.
