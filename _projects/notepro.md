---
layout: page
title: NotePro - Adaptive Notes Generator
description: An end-to-end NLP pipeline that converts raw lecture audio into structured, hierarchical study notes using speech-to-text, NER, topic modeling, and BART summarization.
importance: 3
category: ai-ml
---

## The Motivation

During my IIT Madras Data Science diploma, I was juggling online lectures from IIT alongside my SRM coursework. I'd spend more time re-watching recordings and formatting notes than actually learning. The thought was obvious: *why am I doing the mechanical part of note-taking when NLP models can do it better and faster?*

NotePro (December 2023 -- April 2024) was built to answer that. Feed it a lecture recording, and it outputs a complete, well-structured Markdown document with headings, key definitions, summaries, and highlighted concepts -- ready to study from.

---

## How the Pipeline Works

The system is a six-stage pipeline. Each stage is a standalone Python module, connected via an async task queue so that stages can overlap (e.g., the NER module starts processing the first transcript chunk while the STT module is still transcribing the second half).

### Stage 1: Speech-to-Text

Raw audio is transcribed using the **OpenAI Whisper** API (large-v2 model). I chose Whisper because it handles Indian-accented English well (critical for IIT lectures) and produces punctuated output with paragraph breaks. For longer lectures (>1 hour), I split the audio into 10-minute chunks with 30-second overlap, transcribe in parallel, and stitch transcripts using a sliding-window deduplication step to eliminate repeated sentences at chunk boundaries.

Transcription accuracy on my test set of 50 recorded lectures was **95.2% WER** (word error rate).

### Stage 2: Text Cleaning & Segmentation

Raw transcripts are noisy -- filled with filler words ("um," "you know"), false starts, and repetitive phrasing. I apply a two-pass cleaning pipeline:
1. **Rule-based pass**: Regex patterns remove common fillers and normalize whitespace.
2. **Model-based pass**: A fine-tuned DistilBERT classifier flags and removes disfluent spans (trained on the Switchboard disfluency corpus).

After cleaning, the text is segmented into semantic paragraphs using **TextTiling** (a topic-boundary detection algorithm based on lexical similarity). This segmentation drives the hierarchical structure of the final notes.

### Stage 3: Named Entity Recognition

**spaCy** (with a custom-trained NER model fine-tuned on academic text) extracts:
- **Technical terms and definitions** (e.g., "gradient descent," "Bayes' theorem")
- **People** (researchers, authors mentioned by the lecturer)
- **Equations and formulas** (detected via regex + LaTeX rendering)
- **References** (paper titles, textbook chapters)

Extracted entities are tagged and stored in a structured index used by later stages.

### Stage 4: Topic Modeling

Each semantic paragraph is embedded using **Sentence-BERT**, and the embeddings are clustered using **NMF (Non-negative Matrix Factorization)**. The resulting topics become the **section headings** of the notes. I experimented with LDA first, but NMF produced more interpretable, less overlapping topics for lecture content.

Within each topic cluster, paragraphs are ordered by their timestamp to preserve the lecturer's narrative flow.

### Stage 5: Summarization

This is the core intelligence of NotePro. Each topic section is summarized using a **BART-large** model fine-tuned on a dataset I constructed from 200 lecture-transcript / handwritten-notes pairs contributed by classmates.

The summarization is hybrid:
1. **Extractive step**: TextRank selects the top-k most important sentences per section.
2. **Abstractive step**: BART takes the extractive output and rewrites it into coherent, concise prose.

This two-step approach was critical. Pure abstractive summarization hallucinated facts; pure extractive summarization was choppy. The hybrid approach achieves **90% factual accuracy** while reading fluently.

For sections that contain mathematical content, I bypass the abstractive step and preserve the original sentences with LaTeX-rendered equations, since BART is unreliable with math.

### Stage 6: Output Formatting & Export

The final notes are rendered as Markdown with:
- Auto-generated table of contents
- Hierarchical headings (H1 for lecture title, H2 for topic sections, H3 for subtopics)
- **Bold** key terms (drawn from the NER stage)
- Inline definitions pulled from a prebuilt glossary
- Timestamp links back to the original recording

Export formats: Markdown, PDF (via Pandoc + LaTeX), and DOCX.

---

## Deployment & Performance

I deployed the backend on **AWS Lambda** (for the NLP stages) with audio files stored in **S3**. The STT stage runs on a GPU-equipped EC2 instance triggered by an SQS queue. A lightweight **Flask** API serves as the entry point.

### Benchmarks on 50 test lectures (avg. 55 min each):

| Metric | Value |
|---|---|
| End-to-end processing time | 4.2 min average (30% faster than v1 baseline) |
| Transcription WER | 95.2% |
| Summarization accuracy (human eval) | 90% |
| Topic detection F1 | 0.87 |
| Output length compression | ~70% (1 hour lecture → 3 pages of notes) |

---

## The Hardest Problems I Solved

**Long-document summarization**: BART has a 1024-token context window. A 1-hour lecture transcript is ~8,000 tokens. I couldn't just truncate. The solution was the hierarchical approach: segment into topics first, summarize each topic independently, then generate a global executive summary from the section summaries. This preserved information that would have been lost with naive truncation.

**Domain-specific terminology**: The off-the-shelf NER model misclassified "sigmoid function" as an organization. I fine-tuned spaCy on 500 manually annotated lecture paragraphs to recognize academic entities correctly.

**Latency**: The initial prototype took 12 minutes per lecture. Profiling revealed that 60% of the time was in sequential Whisper calls. Parallelizing audio chunk processing and switching to async pipelines cut the total to 4.2 minutes.

---

## Technical Stack

**Whisper** (STT), **spaCy** (NER), **Sentence-BERT** (embeddings), **NMF/Gensim** (topic modeling), **BART** via Hugging Face Transformers (summarization), **Flask** (API), **AWS Lambda/S3/SQS** (cloud), **Pandoc** (export).

---

## Impact

I used NotePro throughout my final semester and shared it with classmates. The consensus: it saves **2-3 hours per week** that would otherwise go to rewatching lectures and formatting notes. The notes are not perfect -- they occasionally miss nuance that a human listener would catch -- but they provide an excellent first draft that you can annotate and refine in a fraction of the time.
