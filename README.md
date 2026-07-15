# Awesome Role-Playing Agents

A curated collection of selected papers, datasets, benchmarks, and resources on **role-playing agents**, **character simulation**, **persona consistency**, **memory modeling**, and **narrative reasoning**.

This repository focuses on representative and high-quality works rather than an exhaustive list.

**Ordering.** Entries are sorted by year in descending order. Within the same year, peer-reviewed publications are listed before arXiv preprints, and titles are ordered alphabetically within each group.

## Contents

* [Survey and Overview](#survey-and-overview)
* [Role-Playing Agents](#role-playing-agents)
* [Evaluation and Analysis](#evaluation-and-analysis)
* [Datasets and Benchmarks](#datasets-and-benchmarks)
* [Interactive Storytelling and Simulation](#interactive-storytelling-and-simulation)
* [Selection Criteria](#selection-criteria)
* [Contributing](#contributing)

---

## Survey and Overview

| Year | Paper                                                                                                          | Venue               |
| ---- | -------------------------------------------------------------------------------------------------------------- | ------------------- |
| 2024 | [From Persona to Personalization: A Survey on Role-Playing Language Agents](https://arxiv.org/abs/2404.18231)  | TMLR 2024           |
| 2024 | [Two Tales of Persona in LLMs: A Survey of Role-Playing and Personalization](https://arxiv.org/abs/2406.01171) | EMNLP Findings 2024 |

---

## Role-Playing Agents

| Year | Paper                                                                                                                                                                                         | Venue               | Code                                                        | Type                           | Description                                                      |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| 2026 | [AdaMARP: An Adaptive Multi-Agent Interaction Framework for General Immersive Role-Playing](https://arxiv.org/abs/2601.11007)                                                                 | ACL Findings 2026   | -                                                           | Multi-agent + SFT              | Adaptive multi-agent role-playing with scene management.         |
| 2026 | [Codified Finite-state Machines for Role-playing](https://arxiv.org/abs/2602.05905)                                                                                                           | ICLR 2026           | -                                                           | Training-free + State modeling | Models latent character states with codified FSMs.               |
| 2026 | [Deriving Character Logic from Storyline as Codified Decision Trees](https://arxiv.org/abs/2601.10080)                                                                           | ACL 2026 Oral       | [Code](https://github.com/KomeijiForce/Codified_Decision_Tree) | Profile induction + Decision trees | Derives executable character logic from storylines as validated decision trees. |
| 2026 | [Enhancing Persona Following at Decoding Time via Dynamic Importance Estimation for Role-Playing Agents](https://arxiv.org/abs/2603.01438)                                                    | ICLR 2026           | -                                                           | Decoding-time alignment        | Improves persona following with dynamic importance estimation.   |
| 2026 | [HER: Human-like Reasoning and Reinforcement Learning for LLM Role-playing](https://arxiv.org/abs/2601.21459)                                                                                 | ACL Findings 2026   | [Code](https://github.com/cydu24/HER)                       | SFT + RL                       | Trains role-playing models with dual-layer thinking and rewards. |
| 2026 | [HumanLLM: Benchmarking and Improving LLM Anthropomorphism via Human Cognitive Patterns](https://aclanthology.org/2026.acl-long.1783/)                                                   | ACL 2026            | [Code](https://github.com/YJGoodbye2024/HumanLLM)           | Cognitive modeling + SFT       | Models interacting human cognitive patterns for more authentic anthropomorphic role-playing. |
| 2026 | [HyCoRA: Hyper-Contrastive Role-Adaptive Learning for Role-Playing](https://arxiv.org/abs/2511.08017)                                                                                         | AAAI 2026           | [Code](https://github.com/yshihao-ai/HyCoRA)                | PEFT + Contrastive learning    | Balances role-specific and shared character traits.              |
| 2026 | [ThinkPersona: Thinking with Persona Graphs for Faithful Individualized Role-Playing](https://aclanthology.org/2026.acl-long.449/)                                                                      | ACL 2026            | [Code](https://github.com/Hualeez/ThinkPersona)             | Persona graphs + SFT           | Grounds role-playing responses in structured persona histories.  |
| 2026 | [Character-R1: Enhancing Role-Aware Reasoning in Role-Playing Agents via RLVR](https://arxiv.org/abs/2601.04611)                                                                              | arXiv               | -                                                           | RLVR                           | Enhances role-aware reasoning with verifiable rewards.           |
| 2026 | [From Facts to Insights: A Persona-Driven Dual Memory Framework and Dataset for Role-Playing Agents](https://arxiv.org/abs/2605.25693) | arXiv 2026 | [Code](https://github.com/role2026/rolememo) | Memory framework + SFT/RL | Decouples factual cognition and persona-conditioned insight for long-term persona fidelity. |
| 2026 | [Improving General Role-Playing Agents via Psychology-Grounded Reasoning and Role-Aware Policy Optimization](https://arxiv.org/abs/2606.27025) | arXiv               | -                                                           | Psychology-grounded CoT + RL   | Introduces Psy-CoT and RAPO for role-specific reasoning and token-aware policy optimization. |
| 2025 | [Beyond Dialogue: A Profile-Dialogue Alignment Framework Towards General Role-Playing Language Model](https://aclanthology.org/2025.acl-long.586/)                                            | ACL 2025            | [Code](https://github.com/yuyouyu32/BeyondDialogue)         | Data + SFT                     | Aligns role profiles and dialogues.                              |
| 2025 | [CogDual: Enhancing Dual Cognition of LLMs via Reinforcement Learning with Implicit Rule-Based Rewards](https://aclanthology.org/2025.emnlp-main.1389/)                                       | EMNLP 2025          | -                                                           | SFT + RL                       | Enhances dual cognition with rule-based rewards.                 |
| 2025 | [CoSER: Coordinating LLM-Based Persona Simulation of Established Roles](https://arxiv.org/abs/2502.09082)                                                                                     | ICML 2025           | [Code](https://github.com/Neph0s/CoSER)                     | Data + SFT                     | Coordinates persona simulation for established characters.       |
| 2025 | [CPO: Addressing Reward Ambiguity in Role-playing Dialogue via Comparative Policy Optimization](https://aclanthology.org/2025.findings-emnlp.18/)                                             | EMNLP Findings 2025 | -                                                           | RLFT                           | Optimizes role-playing dialogue with comparative rewards.        |
| 2025 | [Crab: A Novel Configurable Role-Playing LLM with Assessing Benchmark](https://aclanthology.org/2025.acl-long.731/)                                                                           | ACL 2025            | [Code](https://github.com/KaiHe-better/Crab)                | SFT + Evaluation               | Builds a configurable role-playing LLM.                          |
| 2025 | [Crafting Customisable Characters with LLMs: A Persona-Driven Role-Playing Agent Framework](https://aclanthology.org/2025.findings-emnlp.1100/)                                               | EMNLP Findings 2025 | [Code](https://github.com/Bernard-Yang/SimsChat)            | Persona + SFT                  | Builds customizable role-playing agents.                         |
| 2025 | [Enhancing Persona Consistency for LLMs’ Role-Playing using Persona-Aware Contrastive Learning](https://aclanthology.org/2025.findings-acl.1344/)                                             | ACL Findings 2025   | -                                                           | Contrastive learning           | Enhances persona consistency in role-playing.                    |
| 2025 | [OmniCharacter: Towards Immersive Role-Playing Agents with Seamless Speech-Language Personality Interaction](https://aclanthology.org/2025.acl-long.1276/)                                    | ACL 2025            | [Code](https://github.com/AlibabaResearch/DAMO-ConvAI/tree/main/OmniCharacter) | Speech-language RPA            | Models personality and voice traits for immersive role-playing.  |
| 2025 | [PsyMem: Fine-grained psychological alignment and Explicit Memory Control for Advanced Role-Playing LLMs](https://arxiv.org/abs/2505.12814)                                                   | TACL                | -                                                           | Psychology + Memory + SFT      | Aligns psychological traits and explicit memories.               |
| 2025 | [R-CHAR: A Metacognition-Driven Framework for Role-Playing in Large Language Models](https://aclanthology.org/2025.emnlp-main.1372/)                                                          | EMNLP 2025          | [Code](https://github.com/lavapapa/R-CHAR)                  | Reasoning + SFT                | Fine-tunes on guided thinking trajectories.                      |
| 2025 | [RolePlot: A Systematic Framework for Evaluating and Enhancing the Plot-Progression Capabilities of Role-Playing Agents](https://aclanthology.org/2025.acl-long.603/)                         | ACL 2025            | -                                                           | Training-free                  | Enhances plot progression with trigger-based prompting.          |
| 2025 | [TailorRPA: A Retrieval-Based Framework for Eliciting Personalized and Coherent Role-Playing Agents in General Domain](https://aclanthology.org/2025.findings-emnlp.288/)                     | EMNLP Findings 2025 | -                                                           | Retrieval + Data               | Uses retrieval for memories and knowledge boundaries.            |
| 2025 | [Thinking in Character: Advancing Role-playing Agents with Role-Aware Reasoning](https://papers.neurips.cc/paper_files/paper/2025/file/aacca7b6a20d157112205a44f42821c8-Paper-Conference.pdf) | NeurIPS 2025        | [Code](https://github.com/Toyhom/thinking_in_character)     | Reasoning + SFT                | Improves role-playing with role-aware reasoning traces.          |
| 2025 | [MOA: Multi-Objective Alignment for Role-Playing Agents](https://arxiv.org/abs/2512.09756)                                                                                                    | arXiv               | -                                                           | Multi-objective RL             | Aligns role-playing agents with multi-objective rewards.         |
| 2025 | [RAIDEN-R1: Improving Role-awareness of LLMs via GRPO with Verifiable Reward](https://arxiv.org/abs/2505.10218)                                                                               | arXiv               | [Code](https://github.com/whn09/RAIDEN-R1)                  | GRPO + Reward                  | Improves role-awareness with verifiable role rewards.            |
| 2024 | [Capturing Minds, Not Just Words: Enhancing Role-Playing Language Models with Personality-Indicative Data](https://aclanthology.org/2024.findings-emnlp.853/)                                 | EMNLP Findings 2024 | -                                                           | Data + SFT                     | Uses personality-indicative data for role-playing.               |
| 2024 | [CharacterGLM: Customizing Chinese Conversational AI Characters with Large Language Models](https://arxiv.org/abs/2311.16832)                                                                 | EMNLP Industry 2024 | [Code](https://github.com/thu-coai/CharacterGLM-6B)         | SFT                            | Customizes Chinese conversational characters.                    |
| 2024 | [Large Language Models are Superpositions of All Characters: Attaining Arbitrary Role-play via Self-Alignment](https://arxiv.org/abs/2401.12474)                                              | ACL 2024            | [Code](https://github.com/OFA-Sys/Ditto)                    | Self-alignment + SFT           | Fine-tunes on self-generated role-play data.                     |
| 2024 | [Neeko: Leveraging Dynamic LoRA for Efficient Multi-Character Role-Playing Agent](https://arxiv.org/abs/2402.13717)                                                                           | EMNLP 2024          | [Code](https://github.com/weiyifan1023/Neeko)               | Dynamic LoRA                   | Enables efficient multi-character role-playing.                  |
| 2024 | [Quantifying and Optimizing Global Faithfulness in Persona-driven Role-playing](https://arxiv.org/abs/2405.07726)                                                                             | NeurIPS 2024        | -                                                           | Faithfulness + DPO             | Optimizes persona faithfulness with APC-based rewards.           |
| 2023 | [Character-LLM: A Trainable Agent for Role-Playing](https://arxiv.org/abs/2310.10158)                                                                                                         | EMNLP 2023          | [Code](https://github.com/choosewhatulike/trainable-agents) | SFT                            | Trains agents from profiles, experiences, and emotions.          |

---

## Evaluation and Analysis

| Year | Paper                                                                                                                                                        | Venue             |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| 2026 | [Understanding Generalization in Role-Playing Models via Information Theory](https://arxiv.org/abs/2512.17270)                                               | ACL Findings 2026 |
| 2025 | [Reasoning Does Not Necessarily Improve Role-Playing Ability](https://aclanthology.org/2025.findings-acl.537/)                                               | ACL Findings 2025 |
| 2025 | [Spotting Out-of-Character Behavior: Atomic-Level Evaluation of Persona Fidelity in Open-Ended Generation](https://aclanthology.org/2025.findings-acl.1349/) | ACL Findings 2025 |
| 2025 | [When Harry Meets Superman: The Role of The Interlocutor in Persona-Based Dialogue Generation](https://aclanthology.org/2025.acl-long.879/)                  | ACL 2025          |

---

## Datasets and Benchmarks

| Year | Paper                                                                                                                                                     | Venue               | Code                                                          | Scope                                |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------- | ------------------------------------ |
| 2026 | [OmniCharacter++: Towards Comprehensive Benchmark for Realistic Role-Playing Agents](https://doi.org/10.1109/TPAMI.2026.3690447)                  | TPAMI 2026          | [Code](https://github.com/zchoi/OmniCharacter-plus)           | Multimodal multi-character role-playing |
| 2026 | [PersonaArena: Dynamic Simulation for Evaluating and Enhancing Persona-Level Role-Playing in Large Language Models](https://aclanthology.org/2026.findings-acl.471/) | ACL Findings 2026 | [Code](https://anonymous.4open.science/r/PersonaArena-B323/) | Dynamic persona-level role-playing evaluation |
| 2026 | [RoleConflictBench: A Benchmark of Role Conflict Scenarios for Evaluating LLMs' Contextual Sensitivity](https://arxiv.org/abs/2509.25897)                 | ACL Findings 2026   | [Code](https://github.com/ddindidu/RoleConflictBench)         | Role conflict                        |
| 2026 | [StratMem-Bench: Evaluating Strategic Memory Use in Virtual Character Conversation Beyond Factual Recall](https://arxiv.org/abs/2604.26243)               | ACL 2026            | -                                                             | Strategic memory use                 |
| 2025 | [Character is Destiny: Can Persona-assigned Language Models Make Personal Choices?](https://aclanthology.org/2025.findings-emnlp.813/)                    | EMNLP Findings 2025 | -                                                             | Persona-driven decision making       |
| 2025 | [CharacterBench: Benchmarking Character Customization of Large Language Models](https://arxiv.org/abs/2412.11912)                                         | AAAI 2025           | [Code](https://github.com/thu-coai/CharacterBench)            | Character customization              |
| 2025 | [CharacterBox: Evaluating the Role-Playing Capabilities of LLMs in Text-Based Virtual Worlds](https://aclanthology.org/2025.naacl-long.323/)              | NAACL 2025          | [Code](https://github.com/Paitesanshi/CharacterBox)           | Text-based virtual worlds            |
| 2025 | [PersonaGym: Evaluating Persona Agents and LLMs](https://aclanthology.org/2025.findings-emnlp.368/)                                                       | EMNLP Findings 2025 | [Code](https://github.com/vsamuel2003/PersonaGym)             | Persona-agent evaluation             |
| 2025 | [Revealing and Mitigating the Challenge of Detecting Character Knowledge Errors in LLM Role-Playing](https://aclanthology.org/2025.emnlp-main.1689/)      | EMNLP 2025          | [Data](https://github.com/WYRipple/rp_kw_errors)              | Character knowledge errors           |
| 2025 | [RMTBench: Benchmarking LLMs Through Multi-Turn User-Centric Role-Playing](https://aclanthology.org/2025.findings-emnlp.730/)                             | EMNLP Findings 2025 | -                                                             | Multi-turn user-centric role-playing |
| 2025 | [RoleMRC: A Fine-Grained Composite Benchmark for Role-Playing and Instruction-Following](https://aclanthology.org/2025.findings-acl.1082/)                | ACL Findings 2025   | [Code](https://github.com/LuJunru/RoleMRC)                    | Role-playing instruction following   |
| 2024 | [CharacterEval: A Chinese Benchmark for Role-Playing Conversational Agent Evaluation](https://aclanthology.org/2024.acl-long.638/)                        | ACL 2024            | [Code](https://github.com/morecry/CharacterEval)              | Chinese role-playing evaluation      |
| 2024 | [Evaluating Character Understanding of Large Language Models via Character Profiling from Fictional Works](https://aclanthology.org/2024.emnlp-main.456/) | EMNLP 2024          | [Code](https://github.com/Joanna0123/character_profiling)     | Character profiling                  |
| 2024 | [InCharacter: Evaluating Personality Fidelity in Role-Playing Agents through Psychological Interviews](https://aclanthology.org/2024.acl-long.102/)       | ACL 2024            | [Code](https://github.com/Neph0s/InCharacter)                 | Personality fidelity                 |
| 2024 | [Mitigating Hallucination in Fictional Character Role-Play](https://aclanthology.org/2024.findings-emnlp.846/)                                            | EMNLP Findings 2024 | [Code](https://github.com/NafisSadeq/rolefact)                | Character hallucination              |
| 2024 | [RoleLLM: Benchmarking, Eliciting, and Enhancing Role-Playing Abilities of Large Language Models](https://arxiv.org/abs/2310.00746)                       | ACL Findings 2024   | [Code](https://github.com/InteractiveNLP-Team/RoleLLM-public) | Role-playing ability                 |
| 2024 | [TimeChara: Evaluating Point-in-Time Character Hallucination of Role-Playing Large Language Models](https://aclanthology.org/2024.findings-acl.197/)      | ACL Findings 2024   | [Code](https://github.com/ahnjaewoo/timechara)                | Point-in-time hallucination          |

---

## Interactive Storytelling and Simulation

Papers on interactive storytelling, fictional world simulation, narrative agents, and multi-agent societies for story generation.

| Year | Paper                                                                                                                   | Venue             | Code                                             | Type                   | Description                                                          |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------ | ---------------------- | -------------------------------------------------------------------- |
| 2025 | [BookWorld: From Novels to Interactive Agent Societies for Creative Story Generation](https://arxiv.org/abs/2504.14538) | ACL 2025          | [Code](https://github.com/alienet1109/BookWorld) | Multi-agent simulation | Builds novel-based agent societies for interactive story generation. |
| 2024 | [From Role-Play to Drama-Interaction: An LLM Solution](https://aclanthology.org/2024.findings-acl.196/)                 | ACL Findings 2024 | [Code](https://github.com/vickywu1022/DramaLLM)  | Interactive drama      | Builds drama LLMs for controllable interactive storytelling.         |

---

## Selection Criteria

This repository mainly includes papers that meet one or more of the following criteria:

* Directly study role-playing agents, character simulation, or persona-based dialogue.
* Propose useful methods for memory, consistency, motivation, or narrative reasoning.
* Provide datasets, benchmarks, or evaluation protocols for role-playing agents.
* Offer important insights from related areas such as LLM agents, cognitive modeling, or interactive storytelling.

## 💡 Contributing

### Contributing to this repository

🙌 Join us in making this repository better! Have we missed any important papers, datasets, benchmarks, or resources? Contributions are welcome — every contribution matters!

When suggesting a paper, please include:

* Paper title
* Authors
* Venue or arXiv link
* Code or project link, if available
* A short reason for inclusion

### Contributors

<a href="https://github.com/MTLI-BUAA/awesome-role-playing-agents/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MTLI-BUAA/awesome-role-playing-agents" />
</a>
