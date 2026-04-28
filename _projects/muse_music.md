---
layout: page
title: Muse - AI Music Generation
description: A three-model deep-learning pipeline (LSTM, VAE, GAN) trained on 100K+ MIDI files to compose original, genre-aware music from scratch.
importance: 2
category: ai-ml
---

## Why Build an AI Composer?

I have six years of Carnatic classical music training. That background gave me an intuition for how melodies develop -- how a phrase sets up expectation, how rhythm creates tension, how a resolution feels "right." I wanted to see whether a neural network could learn those same instincts from data alone, without any explicit music theory. Muse was a two-month personal project (September -- November 2023) to find out.

## The Data: 100,000+ MIDI Files

Music generation lives or dies on the dataset. I scraped and curated over **100,000 MIDI files** spanning classical piano, jazz standards, pop, and electronic music from public archives (MAESTRO, Lakh MIDI Dataset, and additional crawled sources). Each file was parsed using **Music21** and **Pretty_MIDI** into a uniform representation: sequences of (pitch, duration, velocity, time-offset) tuples, quantized to sixteenth-note resolution. I applied data augmentation -- transposing every piece into all 12 keys and jittering tempos by +/- 10% -- to increase variety and reduce key bias.

The processed corpus totalled roughly **3.2 billion note events**. I split it 90/5/5 for train/validation/test.

---

## The Three-Model Architecture

Muse is not a single model. It is a pipeline of three complementary generative models, each addressing a different aspect of musical quality.

### Model 1: LSTM -- Learning Sequential Structure

The backbone is a **3-layer LSTM with 512 hidden units per layer**, trained with teacher forcing. The input is a sliding window of 64 note events; the output is the predicted next event. The network learns local melodic patterns, chord voicings, and rhythmic motifs.

I added a **multi-head self-attention layer** on top of the LSTM outputs. Without attention, the model produced melodies that wandered aimlessly after about 8 bars. With attention, it learned to reference motifs introduced earlier in the piece, creating a sense of thematic development that makes the music sound composed rather than random.

Training ran for **200 epochs** on an NVIDIA RTX 3090 (~18 hours). Next-note prediction accuracy on the test set reached **85%**, but accuracy alone does not capture musical quality -- you have to listen.

### Model 2: VAE -- Capturing Style in Latent Space

A **Variational Autoencoder** with a 128-dimensional latent space learns a compressed representation of 16-bar musical phrases. The encoder is a bidirectional GRU; the decoder is a unidirectional GRU that reconstructs the phrase note-by-note.

The VAE gives Muse two powerful capabilities:
1. **Interpolation**: I can take a jazz phrase and a classical phrase, encode both into latent vectors, interpolate between them, and decode the midpoint to get a piece that smoothly blends both styles. The transition is musically coherent, not just a random mash-up.
2. **Sampling**: Drawing from the learned prior produces novel phrases that respect the statistical structure of real music without copying any specific piece.

I trained the VAE with a combined reconstruction loss (cross-entropy on note events) and KL divergence, with a cyclical annealing schedule for the KL term to avoid posterior collapse.

### Model 3: GAN -- Polishing for Realism

The final stage is a **Wasserstein GAN with gradient penalty (WGAN-GP)**. The generator takes LSTM+VAE outputs and refines them; the discriminator (critic) is trained to distinguish real human-composed phrases from generated ones. The adversarial pressure pushes the generator toward outputs that are indistinguishable from real music.

The GAN was the hardest model to stabilize. Early training suffered from mode collapse -- the generator would find one "safe" pattern and repeat it. The fixes:
- WGAN-GP instead of vanilla GAN loss
- Diverse mini-batches with genre labels to prevent collapsing to a single genre
- Spectral normalization in the critic

After GAN refinement, blind listening tests showed that **listeners correctly identified AI-generated pieces only 58% of the time** (near chance).

---

## Generation Pipeline

```
1. User selects genre + mood (or "surprise me")
        ↓
2. VAE samples a latent vector conditioned on genre
        ↓
3. Decoder produces a seed phrase (16 bars)
        ↓
4. LSTM extends the seed into a full piece (64-128 bars)
        ↓
5. GAN refines the full piece for realism
        ↓
6. Post-processing: quantize, add dynamics, export MIDI
```

The entire pipeline runs in **under 10 seconds** for a 2-minute piece.

---

## Results

- **1,000+ unique compositions** generated across classical, jazz, pop, and electronic genres
- Next-note prediction accuracy: **85%**
- Blind-test human indistinguishability: **42% of pieces fooled listeners**
- Genre classification accuracy of generated pieces: **78%** (i.e., the AI's "jazz" actually sounds like jazz)

---

## Technical Stack

**PyTorch** for all three models. **Music21** and **Pretty_MIDI** for MIDI processing. **NumPy/Pandas** for data wrangling. **MuseScore** for rendering sheet music from generated MIDI.

---

## What This Project Taught Me

Muse showed me that generative modeling is as much art as science. The objective metrics (loss, accuracy) are necessary but not sufficient -- you have to develop an ear for when the model is producing something genuinely musical versus something that merely satisfies the loss function. My classical music background turned out to be the most valuable debugging tool I had: I could hear when the attention mechanism was working because the music started to "rhyme" with itself.
