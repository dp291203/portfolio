---
layout: page
permalink: /research/
title: research
nav: true
nav_order: 3
description: My research across multimodal AI, multi-agent reinforcement learning, embedded 5G systems, and NLP/knowledge graphs — spanning Samsung R&D, IIT Madras, a German RL lab, and IIT (ISM) Dhanbad.
toc:
  sidebar: left
---

Alongside my industry work, I've spent significant time in **academic and industrial research labs**, contributing to peer-reviewed work and applied research across very different domains: **multimodal emotion AI, multi-agent reinforcement learning, embedded systems for 5G, and NLP with knowledge graphs**. This page collects that research in one place.

---

## Multimodal Emotion Recognition — Samsung R&D Institute

**R&D Intern · Audio-Visual AI · Bangalore, India · May–Dec 2023**
*Advisors: Dr. Minu R I & Dr. Jotimoroy Karjee*

At Samsung R&D I worked on **recognizing human emotion from multiple modalities** — combining what a person says (audio) with how they move (body gesture) to produce a more robust emotion estimate than either signal alone.

- Adapted an **ECAPA-TDNN** architecture for **audio emotion recognition**, reaching **97% accuracy** on benchmark datasets, trained in PyTorch on a GPU cluster.
- Built a **body-gesture emotion recognition** pipeline using an **LSTM** over skeleton pose-sequence data.
- Fused the audio and visual streams using **Fuzzy Logic**, improving overall cross-modal robustness to **87%** under noisy, real-world conditions.
- **Co-authored and presented** the work at **IEEE CONECCT 2024, IISc Bangalore** — published in IEEE Xplore.

> *Publication:* "Emotion Detection in Multimodal Communication through Audio-Visual Gesture Analysis," IEEE CONECCT 2024.

---

## Multi-Agent Reinforcement Learning for Vehicle-to-Grid — Düsseldorf Institute of Technology (Germany)

**Research Intern · Reinforcement Learning · Remote (Germany) · Jul 2024 – Jul 2025**
*Advisor: Dr. Andreas J. Kassler*

This was my longest and most involved research engagement: applying **deep multi-agent reinforcement learning** to **Vehicle-to-Grid (V2G)** energy optimization, where a district of buildings, batteries, and EVs must coordinate charging and discharging to balance the grid.

- Designed a **multi-objective reward function** balancing battery **state-of-charge management, self-consumption, peak-load reduction, and carbon minimization** across a simulated multi-agent energy district.
- Implemented and GPU-trained **SAC** and **MADDPG** algorithms via **RLlib** for multi-agent demand response.
- Integrated a **rule-based safety shield** that enforces hard operational constraints during learning, reducing critical violations and **boosting agent efficiency by 11%**.
- Extended the **CityLearn** simulator with a **peer-to-peer energy-sharing mechanism**, letting agents trade surplus energy to minimize grid imports and environmental impact.

---

## NLP & Knowledge Graphs for Mining-Accident Analysis — IIT (ISM) Dhanbad

**Research Intern · NLP / Knowledge Graphs · Remote · Jan–Mar 2025**
*Advisor: Dr. Siddharth Agarwal*

Here I worked on turning **unstructured mining-accident records** into queryable, analyzable knowledge — to help surface trends and root causes from decades of incident reports.

- Converted unstructured **PDF accident records** into structured datasets for analysis.
- Applied **NMF** and **cosine similarity** for **topic modeling** of accident reports.
- Used **graph databases** and **Protégé ontologies** for knowledge representation and trend analysis.
- Built a **hybrid RAG system** combining dense retrieval with knowledge-graph querying to answer natural-language questions, visualize trends, and auto-generate analytical reports.
- Developed an **NLP classifier** to predict accident codes from free-text descriptions, achieving **80% accuracy**.

---

## Embedded Firmware for a 5G mmWave Testbed — IIT Madras

**Research Intern · Embedded AI / 5G · Chennai, India · Jun–Aug 2023**
*Advisors: Dr. Sankaran Aniruddhan & Dr. Radha Krishna Ganti*

At the IIT Madras 5G testbed I worked close to the hardware, building the **real-time firmware and data pipeline** that feeds sensor data into a 5G mmWave experimentation setup.

- Developed **real-time firmware** for **C2000 F28388** and **TIVA TM4C** microcontrollers to acquire and process multi-sensor data.
- Implemented **MQTT-based communication** and an **HTTP scheduler** for synchronized, low-latency multi-sensor streaming to the cloud.
- Applied **RTOS** concepts, **embedded networking**, and **serial communication** protocols to interface sensors with central processing nodes across the testbed architecture.

---

## Themes Across My Research

Across these projects, a few threads recur: **fusing heterogeneous signals** (audio + gesture, multiple agents, sensors + cloud), **making learning systems safe and robust** (safety shields, fuzzy fusion, real-time constraints), and **bridging messy real-world data with structured reasoning** (knowledge graphs, RAG, embedded pipelines). They span the full stack — from microcontroller firmware to GPU-trained deep RL — which is exactly the range I enjoy working across.
