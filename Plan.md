# A Hybrid AI Framework for Reconstructing the Diachronic Evolution of Marathi from Sanskrit
## Comprehensive System Blueprint, Technology Stack, and Implementation Plan

---

## 1. Executive Summary & Research Foundation

Based on the research proposal (*Marathwada Mitra Mandal's Research Promotion Scheme - MMRPS*) and research papers (*IEEE Diachronic Reconstruction Paper* and *Marathi AI Drafting*), this project implements an **Explainable Hybrid Artificial Intelligence Framework** that models and reconstructs the historical sound changes and semantic drift linking **Old Indo-Aryan (Sanskrit)** to **Modern Marathi (New Indo-Aryan)** through intermediate **Middle Indo-Aryan** stages (**Maharashtri Prakrit** and **Apabhraṃśa**).

### Core Breakthrough: The Hybrid Paradigm
Conventional sequence-to-sequence neural models (such as unconstrained Transformers or LSTMs) operate as black boxes, frequently predict phonotactically illegal forms, and fail to generalize on low-resource historical corpora. This framework introduces:
1. **Articulatory Feature Grounding**: Encodes phonemes into 24-dimensional continuous vectors derived from the International Phonetic Alphabet (IPA) via **PanPhon**, rather than arbitrary discrete tokens.
2. **Rule-Constrained Cross-Attention**: Incorporates a dynamic sound-law transition prior matrix ($M_{\text{rule}}$) that penalizes historically impermissible mutations during decoding.
3. **Diachronic Semantic Drift Modeling**: Uses an InfoNCE contrastive representation learning objective to align ancient Sanskrit roots with modern Marathi reflexes.
4. **Step-by-Step Traceable Derivation Auditor**: Exposes intermediate Prakrit/Apabhraṃśa stages and logged sound law IDs, satisfying the Neogrammarian interpretability requirements of historical linguistics.

---

## 2. Complete Technology Stack Selection

### 2.1 Frontend Platform
- **Framework**: **Next.js 14+ (App Router)** with **React 18** and **TypeScript**
- **Styling**: **TailwindCSS** + Custom Design Tokens (Deep Slate, Saffron Gold, Crimson Rose, Emerald Matrix)
- **UI Components & Icons**: **Lucide-React**, **Radix UI** primitives, custom accessible controls
- **Data Visualization**: **Recharts** / Canvas-based phoneme alignment matrices and interactive derivation trees
- **State Management & Fetching**: React Hooks (`useState`, `useMemo`, `useCallback`) with unified API Client fallback mechanisms

### 2.2 Backend API Service
- **Language & Runtime**: **Python 3.11+**
- **Framework**: **FastAPI** + **Uvicorn** (Asynchronous, high-throughput, auto-generated OpenAPI / Swagger docs)
- **Validation & Schemas**: **Pydantic v2**
- **Inter-process Communication**: RESTful JSON APIs + WebSockets for real-time batch decoding and training simulation

### 2.3 Machine Learning & Phonetic Engineering
- **Deep Learning Core**: **PyTorch 2.3+** with **PyTorch Lightning**
- **Transformer Libraries**: **Hugging Face Transformers**, `tokenizers`
- **Articulatory Phonetics**: **PanPhon** (Mortensen et al.) for 24-dimensional subsegmental articulatory vectors
- **Grapheme-to-Phoneme (G2P)**: **Epitran** (Sanskrit & Indic G2P rule backends) + custom Classical Sanskrit normalizers
- **Indic Script & Normalization**: **IndicNLP Library** (Devanagari Unicode NFC normalization, virama resolution, IAST transliteration)
- **Evaluation Metrics**: `sacrebleu`, `editdistance`, `panphon.distance`, `scikit-learn`

### 2.4 Database, Storage & Caching
- **Primary Database**: **PostgreSQL 16** with **JSONB** indexing (for storing 12,500 cognate sets, FST rule definitions, and audit traces)
- **Vector Embeddings Store**: **pgvector** or **ChromaDB / FAISS** (for semantic embeddings search)
- **Cache Layer**: **Redis 7** (for cached inference results and rule transition matrices)

---

## 3. Machine Learning Models & Mathematical Architecture

```
                                  +-----------------------------+
                                  |     Input Sanskrit Root     |
                                  |         (Devanagari)        |
                                  +--------------+--------------+
                                                 |
                                                 v
                                  +-----------------------------+
                                  |    MOD-01: G2P & Normalizer |
                                  |     (Unicode NFC -> IPA)    |
                                  +--------------+--------------+
                                                 |
                       +-------------------------+-------------------------+
                       |                                                   |
                       v                                                   v
        +-----------------------------+                     +-----------------------------+
        |  MOD-02: FST Rule Engine    |                     | MOD-03: Phoneme Transformer |
        | (R1-R5 Sound Law Transducer)|                     |           Encoder           |
        +--------------+--------------+                     | (64D Embedding + 24D PanPhon|
                       |                                    |       d_model = 256)        |
                       |                                    +--------------+--------------+
                       |                                                   |
                       |  Transition Prior Matrix (M_rule)                 | Contextual Hidden
                       |  & Intermediate Hypotheses (X_Prakrit)            | States (H_enc)
                       |                                                   |
                       +-------------------------+-------------------------+
                                                 |
                                                 v
                                  +-----------------------------+
                                  | MOD-04: Rule-Guided Decoder |
                                  |   Attention(Q,K,V + λ*M)   |
                                  +--------------+--------------+
                                                 |
                       +-------------------------+-------------------------+
                       |                                                   |
                       v                                                   v
        +-----------------------------+                     +-----------------------------+
        | MOD-05: Semantic Projector  |                     |  MOD-06: Derivation Auditor |
        | (InfoNCE Contrastive Drift) |                     |  (Attention-to-Rule Matcher)|
        +--------------+--------------+                     +--------------+--------------+
                       |                                                   |
                       +-------------------------+-------------------------+
                                                 |
                                                 v
                                  +-----------------------------+
                                  | Output: Reconstructed Reflex|
                                  | + Multi-Stage Audit Trace   |
                                  +-----------------------------+
```

### 3.1 Composite Input Embedding
For each phoneme $x_i \in X$:
$$e(x_i) = W_p [ e_{\text{cat}}(x_i) \parallel f_{\text{panphon}}(x_i) ] + P_i$$
- $e_{\text{cat}}(x_i) \in \mathbb{R}^{64}$: Learned categorical phoneme embedding.
- $f_{\text{panphon}}(x_i) \in \mathbb{R}^{24}$: 24-dimensional binary/ternary articulatory subsegmental feature vector:
  `[syl, son, cons, cont, delrel, lat, nas, voi, cgr, vgr, ant, cor, distr, lab, hi, lo, back, round, velaric, tense, long, hitone, hireg, retroflex]`.
- $W_p \in \mathbb{R}^{256 \times 88}$: Linear projection matrix to model dimension $d_{\text{model}} = 256$.
- $P_i \in \mathbb{R}^{256}$: Sinusoidal positional encoding.

### 3.2 Historical Sound Law Engine (MOD-02)
Deterministic finite-state rewrite rules $\phi \to \psi / \gamma \_ \delta$ executing five foundational categories:
1. **Rule 1 (R1) - Intervocalic Stop Weakening & Elision**: $V C_{\text{stop}} V \to V \emptyset V / V G V$ (e.g., *loka* $\to$ *loa* $\to$ *lok*).
2. **Rule 2 (R2) - Consonant Cluster Assimilation**: $C_1 C_2 \to C_{\text{geminate}}$ (e.g., *bhakta* $\to$ *bhatta*, *karman* $\to$ *kamma*).
3. **Rule 3 (R3) - Degemination with Compensatory Lengthening**: $V_{\text{short}} C_i C_i \to V_{\text{long}} C_i$ (e.g., *hasta* $\to$ *hattha* $\to$ *hāt*, *sapta* $\to$ *satta* $\to$ *sāt*).
4. **Rule 4 (R4) - Conditioned Retroflexion & Lateral Emergence**: $n \to ṇ$, $l \to ḷ$ (e.g., *pānīya* $\to$ *pāṇī*, *phala* $\to$ *phaḷ*).
5. **Rule 5 (R5) - Terminal Apocope & Schwa Deletion**: $V_{\text{final}} \to \emptyset$, $\partial \to \emptyset$ (e.g., *danta* $\to$ *dā̃t*).

### 3.3 Rule-Constrained Cross-Attention (MOD-04)
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}} + \lambda M_{\text{rule}}\right)V$$
Where $M_{\text{rule}}[i, j]$ is defined as:
$$M_{\text{rule}}[i, j] = \begin{cases} 0 & \text{if } y_i \text{ is a valid historical reflex of } x_j \text{ under attested rules} \\ -\infty & \text{if } x_j \to y_i \text{ is historically impermissible} \end{cases}$$
$\lambda > 0$ is a learnable scaling parameter dynamically weighting the symbolic prior against data-driven attention.

### 3.4 Contrastive Semantic Drift Loss (MOD-05)
$$\mathcal{L}_{\text{semantic}} = -\sum_{i=1}^{B} \log \frac{\exp(\text{sim}(z_i^{\text{Skt}}, z_i^{\text{Mar}}) / \tau)}{\sum_{j=1}^{B} \exp(\text{sim}(z_i^{\text{Skt}}, z_j^{\text{Mar}}) / \tau)}$$
- Dual-encoder projections mapping fastText/IndicBERT embeddings into a shared semantic latent space.
- Temperature parameter $\tau = 0.07$.

### 3.5 Composite Multi-Task Training Objective
$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{CE}} + \alpha \mathcal{L}_{\text{feature}} + \beta \mathcal{L}_{\text{semantic}}$$
- $\mathcal{L}_{\text{CE}}$: Standard cross-entropy loss over target phoneme tokens.
- $\mathcal{L}_{\text{feature}}$: Articulatory feature divergence loss ($\text{MSE}(f_{\text{pred}}, f_{\text{target}})$).
- $\alpha = 0.3, \beta = 0.2$.

---

## 4. Benchmark Dataset Specifications (12,500 Aligned Cognates)

The dataset is categorized across 4 lexical strata with an 80/10/10 stratified train/validation/test split:

| Stratum Category | Total Count | Train (80%) | Val (10%) | Test (10%) | Exemplar Sanskrit $\to$ Prakrit $\to$ Marathi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tadbhava (Regular Sound Change)** | **8,250** | 6,600 | 825 | 825 | *adya* $\to$ *ajja* $\to$ *āj* (आज); *karpaṭa* $\to$ *kappaḍa* $\to$ *kāpaḍ* (कापड) |
| **Tadbhava (Complex Cluster Reduction)** | **2,450** | 1,960 | 245 | 245 | *akṣi* $\to$ *akkhi* $\to$ *ḍoḷā* / *ākha*; *kṣetra* $\to$ *khetta* $\to$ *shet* (शेत) |
| **Tatsama (Phonologically Adapted)** | **1,200** | 960 | 120 | 120 | *karma* $\to$ *kamma* $\to$ *karma* (कर्म); *pustaka* $\to$ *pustak* (पुस्तक) |
| **Deshya / Substrate Interacting** | **600** | 480 | 60 | 60 | *ghoṭaka* $\to$ *ghoḍaa* $\to$ *ghoḍā* (घोडा); *markaṭa* $\to$ *makkaḍa* $\to$ *mākaḍ* (माकड) |
| **Total Benchmark Corpus** | **12,500** | **10,000** | **1,250** | **1,250** | Fully aligned multi-stage intermediate representations |

**Primary Data Sources**:
- *Sir Ralph Lilley Turner (CDIAL)*: Comparative Dictionary of the Indo-Aryan Languages
- *Jules Bloch*: La formation de la langue marathe
- *Molesworth*: Marathi and English Dictionary (2nd ed.)
- *AI4Bharat*: Aksharantar & IndicCorp Lexicons

---

## 5. Quantitative Target Metrics & Baselines

| Model Architecture | CER (%) $\downarrow$ | Phonetic Edit Dist (PED) $\downarrow$ | Phoneme BLEU $\uparrow$ | chrF++ $\uparrow$ |
| :--- | :--- | :--- | :--- | :--- |
| **Deterministic Rule FST Engine** | 18.42% | 1.34 | 64.12 | 71.05 |
| **BiLSTM + Attention Baseline** | 14.85% | 0.98 | 71.30 | 76.82 |
| **Vanilla Transformer (Discrete Phonemes)** | 11.20% | 0.76 | 77.45 | 81.60 |
| **Unconstrained Reflex Transformer** | 9.84% | 0.62 | 80.12 | 84.15 |
| **Hybrid (Ablation: No Semantic Loss)** | 7.15% | 0.48 | 84.80 | 87.65 |
| **Hybrid (Ablation: No Rule Bias $\lambda=0$)** | 8.32% | 0.55 | 82.60 | 85.90 |
| **PROPOSED FULL HYBRID FRAMEWORK** | **6.12%** | **0.41** | **87.25** | **89.43** |

---

## 6. Phase-by-Phase Implementation Plan

### Phase 1: Phonetics & Linguistic Normalization Engine (MOD-01)
- [ ] Build Unicode NFC normalizer, virama resolver, and anusvara standardizer.
- [ ] Implement Sanskrit & Marathi Grapheme-to-Phoneme (G2P) converters mapping Devanagari to IPA.
- [ ] Integrate PanPhon 24-dimensional articulatory vector extractor for each phoneme.

### Phase 2: Finite State Sound Law Rule Engine (MOD-02)
- [ ] Implement deterministic transformation rules for R1, R2, R3, R4, R5.
- [ ] Construct intermediate hypothesis generators for Maharashtri Prakrit and Apabhraṃśa.
- [ ] Implement the dynamic sound-change prior constraint matrix generator $M_{\text{rule}}$.

### Phase 3: Benchmark Dataset & Data Access Pipeline
- [ ] Establish structured data models for the 12,500 cognate pairs with phoneme-level alignments.
- [ ] Create stratum-based search, filtering, and export tools (JSON, CSV, CoNLL-U format).
- [ ] Build dataset verification scripts to check for zero-width joiners, diacritics, and phonotactic validity.

### Phase 4: Neural Sequence Modeling & Attention Biasing (MOD-03, MOD-04)
- [ ] Implement the 4-layer Bidirectional Transformer Encoder with PanPhon feature projection.
- [ ] Implement the 4-layer Autoregressive Transformer Decoder with rule-biased cross-attention ($M_{\text{rule}}$ injection).
- [ ] Implement multi-task loss computation ($\mathcal{L}_{\text{CE}} + 0.3 \mathcal{L}_{\text{feature}} + 0.2 \mathcal{L}_{\text{semantic}}$).

### Phase 5: Semantic Drift & InfoNCE Dual-Encoder (MOD-05)
- [ ] Load and align Sanskrit and Marathi contextual embeddings.
- [ ] Implement dual-encoder projection heads with InfoNCE contrastive loss.
- [ ] Compute diachronic semantic drift scores and vector proximity charts.

### Phase 6: Derivation Auditor & Trace Exporter (MOD-06)
- [ ] Correlate decoder cross-attention weights with active sound laws from MOD-02.
- [ ] Generate human-readable step-by-step derivation trees showing phonological mutations at each historical era.
- [ ] Implement evaluation suite computing CER, PED, Phoneme BLEU, and chrF++.

### Phase 7: Full-Stack Platform Integration & UI Deployment
- [ ] Deploy Python FastAPI backend (`/api/v1/reconstruct`, `/api/v1/rules`, `/api/v1/semantic-drift`, `/api/v1/dataset`, `/api/v1/benchmark`).
- [ ] Connect Next.js frontend with live backend API endpoints and robust local deterministic fallback engines.
- [ ] Deliver interactive UI modules: Diachronic Reconstruction Studio, Rule Explorer, Semantic Drift Visualizer, Lexical Dataset Browser, and Model Benchmark Arena.
