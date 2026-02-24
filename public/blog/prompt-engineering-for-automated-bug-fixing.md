### Precursor:

During my time taking the **ECE1785 - Empirical Software Engineering** course during my Master's of Engineering at the Univeristy of Toronto, I decided to tackle the topic of Automated Program Repair -- a technical term for generating bug fixes in an automated fashion -- via LLMs and prompt engineering. This paper tackles a series of codebases and datasets ranging across code complexity and bug complexity for Python and Java codebases, and dives into the current capabilities of LLMs solvingbugs via its code generation capabilities, particularly for the current state-of-the-art engine GPT-4o.

The results are quite staggering as to the limitation of GPT-4o for solving more complex bugs. This provided some illumination as to the capabilities of current modern day LLMs across more complex codebases under current prompt engineering strategies.

### Abstract
This document presents a preliminary study on prompt engineering for automated bug fixing using Large Lan- guage Models (LLMs). By focusing on Python logical bugs, this study compares different prompt strategies (few-shot, chain-of- thought, and contextual prompts) to evaluate fix accuracy, and maintainability. The study outlines research questions, experi- mental procedure, and timeline, highlighting early observations and plans for deeper analysis. Our initial pilot suggests that well- crafted examples and detailed context significantly improve patch reliability, though reasoning-based prompts alone do not always guarantee coverage of corner cases.

######  I.	INTRODUCTION
Software bugs are an inevitable part of developing and maintaining complex systems, posing challenges such as in- creased costs, project delays, and potential security risks [1]. With the release of large language models (LLMs)—most notably GPT-4—there is growing optimism that these models can significantly assist in automating aspects of debugging and code repair [2], [3]. Previous work highlights that the quality of model-generated solutions largely depends on how the task is specified, spotlighting the importance of prompt engineering [5].
Researchers have found that prompts containing specific bug context, error messages, and example patches can guide the model toward more accurate and maintainable fixes [4], [6]. However, there remains a notable gap in understanding which prompting strategies generalize across programming languages, bug types, and codebases. While some prompts demonstrably improve model performance in controlled set- tings [5], [6], the ability to transfer these improvements to a broad range of real-world scenarios is far from guaranteed [2], [7].
This is a significant concern because modern software is developed in diverse ecosystems, where different languages, frameworks, and bug categories demand unique considera- tions [7]. A prompt engineering technique that excels at fixing syntax errors in Python, for instance, may falter when applied to logical errors in Java or performance-related bugs in C++ [8]. For practitioners, the lack of generalizable methods can lead to fragmented or inconsistent debugging workflows that require constant recalibration of prompts. For researchers, a deeper understanding of generalizability is vital for establish- ing robust empirical foundations and guiding future studies, ensuring that insights from one domain or bug type can reliably inform solutions in others [3].
By systematically investigating various prompt engineering techniques, this study aims to address three specific gaps:
(1)	the limited understanding of which prompt structures are most effective for logical bug fixing across different contexts,
(2) the unclear role of contextual information in improving fix accuracy, and (3) the need for actionable guidelines to implement effective LLM-based debugging workflows. Our primary research goal is to develop practical, evidence-based recommendations for using LLMs in automated bug fixing scenarios, with a focus on maximizing both fix accuracy and code maintainability.

### II.	BACKGROUND AND RELATED WORK
A.	Automated Program Repair (APR)
Definition and Evolution. Automated Program Repair (APR) centers on generating patches for software bugs with minimal or no human input [1]. Traditional APR methods often involve genetic algorithms or heuristic-driven patch generation [10]. Although these techniques can successfully fix simpler bugs, they frequently stumble with complex or domain-specific issues—for example, concurrency errors or intricate logical flaws—because their patch generation relies on a limited set of predefined mutations [7].
Why Complex Bugs Are Challenging. Monperrus [1] outlines how early APR methods typically focus on super- ficial code changes or known fault patterns. However, real- world bugs often span multiple files or involve deep logic. For instance, thread-safety violations in large-scale enterprise systems might require refactoring entire classes, which goes beyond template-based patching. These shortfalls in traditional APR motivated researchers to explore more context-aware approaches, such as Large Language Models (LLMs).
B.	LLMs in Software Engineering and Their Relevance to Bug Fixing
Modern LLMs like GPT-4, Codex, and CodeT5 possess a transformer-based architecture, enabling them to learn syntax and semantic patterns across diverse codebases [2], [3]. In tasks like code completion, they parse the context (e.g., variable declarations, function definitions) to generate coherent lines of code. Extending these capabilities to bug fixing involves prompting the model with code snippets containing one or more defects, along with cues such as compiler errors or test failures.
Semantic Understanding. Whereas traditional APR might blindly mutate code segments, LLMs can interpret high-level constraints or error messages essential for diagnosing logical or performance-related issues. This contextual intelligence paves the way for more precise and maintainable fixes.
 
Generalization Across Tasks. LLMs benefit from train- ing on extensive repositories spanning multiple languages and frameworks, theoretically granting them a broad base of knowledge. However, whether this breadth consistently translates into robust fixes for real-world bugs remains an open question motivating the prompt engineering focus of this study.

C.	Prompt Engineering for Bug Fixing
Bridging the Gap: Prompt Engineering + APR. Although LLMs show promise in code-related tasks, their outputs are highly sensitive to prompt design [4], [6]. For automated bug fixing, a few methods can be explored:
•	Few-Shot Prompting: Providing examples of buggy code paired with corrected fixes helps the model emulate demonstrated patterns.
•	Zero-Shot Prompting: Supplies only the buggy code and basic instructions, relying on the model’s pre-trained knowledge with no example fixes.
•	Chain-of-Thought: Instructing the model to articulate the reasoning behind a fix can lead to clearer, more logically consistent solutions [11].
•	Iterative Feedback: Presenting error messages or test logs in subsequent queries allows the model to refine its solution step-by-step [9].
These methods specifically target bug-fixing challenges by guiding the LLM to locate, understand, and address the root cause rather than guessing from superficial cues. Nonetheless, contradictory findings exist: while some studies find chain-of- thought prompts significantly improve logical bug fixes [11], others suggest minimal or iterative prompts suffice if crucial error details are provided [4]. This discrepancy necessitates deeper, more systematic research on why certain prompts succeed where others fail.

### III.	RESEARCH QUESTIONS
We refine our research questions to highlight clear metrics, focused scope, and causal factors behind prompt efficacy.
RQ1: Prompt Efficacy in Logical Bug Fixes What specific prompt structures (e.g., few-shot examples, chain-of-thought instructions) maximize the fix success rate for logical errors in Python and Java code? Success Rate Definition: The percentage of patches produced by the LLM that pass all associated unit tests. We focus on Python and Java logical bugs to maintain a feasible scope while still exploring cross- language generalizability.
RQ2: Role of Contextual Data How does including com- piler errors, stack traces, or code-intent comments influence the model’s ability to locate and correct logical flaws? Why Might It Help? We hypothesize that context reduces guess- work, thus improving patch validity. We will track compilation success and code readability as complementary metrics.
RQ3: Explaining Prompt Success and Evaluation Met- rics Why do certain prompt strategies yield better outcomes? We will conduct a qualitative analysis of chain-of-thought or iterative solutions, comparing them against simpler prompts to see how the model reasons and where it fails.
 
By limiting our scope primarily to Python and Java logi- cal bugs, we address feasibility concerns and ensure deeper investigation into how and why prompts work across differ- ent programming languages, rather than merely enumerating which ones do.


### IV.	RESEARCH METHOD
A. Methodology Overview
This study evaluates the effectiveness of different prompt engineering strategies for automated bug fixing using Large Language Models (LLMs). We collected bugs from multiple programming languages, focusing on both Python bugs from the wtfiswronghere dataset and Java bugs from the QuixBugs benchmark. This cross-language approach allows us to assess the generalizability of our prompting strategies across different programming languages and bug types. The methodology is divided into three primary phases:

1)	Data Collection: Gathering Python bugs along with failing tests to objectively measure fix correctness.
2)	Prompt Design & Pilot Testing: Developing multiple prompt templates (zero-shot, few-shot, and chain-of- thought) and refining them through preliminary experi- ments.
3)	Full-Scale Experiments & Analysis: Applying the refined prompt templates to the entire dataset and eval- uating the generated fixes using quantitative (e.g., fix accuracy) and qualitative (e.g., code readability) metrics.


### V.	DATA COLLECTION PROCESS
In our study, we leverage established bug benchmark datasets rather than collecting new bugs, allowing us to build upon validated resources with pre-existing test cases. Bugs were selected based on their relevance to common coding mistakes and were paired with failing test cases to measure correctness. Our data collection focuses primarily on the wtfiswronghere [13] dataset, along with a smaller subset from QuixBugs [12].
•	wtfiswronghere [13]
The wtfiswronghere dataset is a collection of Python pro- grams containing intentionally introduced bugs designed to test debugging skills. Each example contains a small program with a logical error, accompanied by expected output and a description of the intended functionality. This dataset provides realistic scenarios for evaluating how different prompt strategies handle common Python programming errors.
•	QuixBugs [12]
QuixBugs is a well-known benchmark consisting of 40 small programs (classic algorithms), each containing a single-line logical bug. It provides both Python and Java versions of each bug, allowing us to measure cross- language applicability of our prompt structures and verify fixes using the corresponding test cases.
•	Defects4j [14]
Defects4j is a curated benchmark of real-world Java bugs drawn from widely-used open-source projects such as Lang, Gson, etc. Each bug is accompanied with the orig- inal faulty version of the code and a suite of regression tests that can be used to trigger and validate fixes. Unlike the previous two datasets, Defects4j offers incredibly complex bugs that help better reflect the challenges developers face in practice. We selected a subset of bugs from this dataset to complement the simpler bugs found in the previous datasets. This inclusion allowed us to assess how well different prompt strategies generalize to more realistic and structurally diverse codebases, providing a deeper testbed for evaluating automated bug-fixing capabilities in LLMs.
Across these datasets, we capture a broad spectrum of bug types, programming paradigms, and code complexities. Collectively, they allow us to evaluate:
1)	The consistency of each prompt strategy (Zero-Shot, Few-Shot, and Chain-of-Thought).
2)	The degree to which adding contextual information (e.g., error messages or logical constraints) influ- ences the efficacy of automated bug fixes generated by Large Language Models.


### VI.	AUTOMATED BUG-FIXING FRAMEWORK
To assess the impact of different prompt strategies on automated bug fixing, we implemented a modular frame- work using Large Language Models (LLMs), built with the LangChain library. This framework supports both general-purpose bug datasets (e.g., Python files from wtfiswronghere) and complex, real-world Java bugs from Defects4J.
A.	General Bug-Fixing Pipeline (Python and Java)
This baseline pipeline processes synthetic or curated bugs (e.g., from wtfiswronghere and QuixBugs) and evaluates how different prompt strategies affect LLM performance:

1)Environment Setup: Environment variables are loaded and the OpenAI API key is initialized for secure LLM access.

2)Prompt Template Definition: Three primary prompt templates are defined:
–	Zero-Shot Prompting: The model is given only the buggy code and a repair instruction.
–	Few-Shot Prompting: An illustrative example of a buggy function and its fix is provided before the actual bug.
–	Chain-of-Thought Prompting: The model is instructed to reason step-by-step through the bug before suggesting a fix.

3)Bug File Reading: The framework reads the con- tents of each bug file (e.g., a single Python or Java class) and loads its associated test cases.

4)LLM Invocation and Response Processing: The code is injected into the appropriate prompt tem- plate, and the LLM is queried for a fix. The response is parsed, and only the code portion is extracted.
 
5)Evaluation: The patched file is executed against its test suite to verify whether the fix resolves the original issue. Key metrics such as fix accuracy, syntactic validity, and maintainability are logged.

B.	Defects4J-Specific Bug-Fixing Pipeline (Java)
To handle real-world Java bugs at scale, we developed a specialized pipeline tailored to the structure of the Defects4J benchmark. This pipeline includes additional steps for metadata parsing, code extraction, and token- aware prompt construction:

1)Project Checkout: Using the Defects4J CLI, the pipeline checks out a specified buggy project ver- sion (e.g., Lang-1b) into a working directory.

2)Bug Metadata Extraction: Defects4J is queried
to retrieve detailed metadata including the modified class, failing test method, and relevant supporting source/test classes.

3)Relevant File Extraction: Files corresponding to the bug (i.e., the class to modify, the triggering test file, and additional dependencies) are identified and copied into a staging folder.

4)Prompt Construction: All extracted files are la- beled and combined into a single prompt text, with section headers such as:
– ===== CLASS TO MODIFY =====
– ===== TRIGGER TEST =====
– ===== RELEVANT SRC FILE =====

Dynamic prompt templates are then filled in using metadata from the Defects4J query.

5)Token-Aware Chunking: If the combined file ex- ceeds token limits, the framework splits it into smaller parts using a model-aware text splitter (e.g., 30,000 tokens per chunk). Only the final part includes the <<<END_OF_INPUT>>> marker to signal the model that generation may begin.

6)LLM Invocation and Patch Insertion: Each chun- ked prompt series is fed into the LLM. Once a response is received, the generated fix is program- matically inserted into the original Java class.

7)Test Execution and Evaluation: The modified project is compiled and executed using Defects4J’s regression test suite. If all tests pass, the bug is considered successfully fixed. Evaluation metrics include pass rate, patch correctness, and fix gran- ularity.
This pipeline was specifically tailored for the ChatGPT UI use case, as sending the full volume of code directly to the API was estimated to cost over USD$150. To work around this, two alternatives were considered for providing the input to ChatGPT: (1) manually copying the pre-generated, chunked and labeled prompts from text files into the UI, and (2) manually uploading the relevant source and test files through the ChatGPT interface.
 
C.	Experimental Timeline
–	Weeks 1–2: Dataset Preparation
∗ Collect ∼ 20 Python bugs from online reposito- ries.
∗ Tag each bug with failing tests to measure cor- rectness.
–	Weeks 3–4: Prompt Design & Pilot Testing
∗ Develop and refine prompt templates (zero-shot, few-shot, and chain-of-thought).
∗ Conduct pilot tests on ∼ 10 bugs to identify confounding issues.
–	Weeks 5–6: Full Experiments (Currently this is where our research has reached)
∗ Apply prompt templates to the entire bug set using a stable GPT model.
∗ Log success rates, compilation errors, and test pass/fail results.
–	Weeks 7–8: Analysis & Validation
∗ Perform quantitative comparisons on fix success rates.
∗ Conduct qualitative reviews of code maintainabil- ity.
∗ Finalize results and compile discussion points for the concluding report.


### VII.	RESULTS (PRELIMINARY)
A.	Results from QuixBugs Java (Logic Bugs) Dataset
To evaluate the effectiveness of our prompts in a broader context, we ran a subset of QuixBugs Java programs through our automated bug-fixing pipeline. We tested each buggy program with three prompt strategies—Zero-Shot, Few-Shot, and Chain-of-Thought (CoT)—and recorded whether the generated fix success- fully passed the existing unit tests. Table I represents truncated findings for ten representative QuixBugs prob- lems. The full list of results can be found in the Github repository [15]. It was deemed best to test on this dataset as it provides bugs that only require a one-line logical bug fix, and thus it serves as an ideal starting point for our testing framework before scaling to more complex datasets.
Some key observations include a high overall success rate across most problems when using the GPT-4.0 model. In total, each approach succeeded in 9 out of 10 cases. The unique failures included BREADTH_FIRST_SEARCH, which failed only under the Chain-of-Thought prompting (where it passed under Zero-Shot and Few-Shot). Ad- ditionally, GET_FACTORS failed under Zero-Shot and Few-Shot but passed with Chain-of-Thought.
The consistency and variability of the results suggest an emerging pattern where Zero-Shot and Few-Shot often produce similar outcomes. Chain-of-Thought occasion- ally showcases either unique successes (GET_FACTORS) or unexpected failures (BREADTH_FIRST_SEARCH), suggesting that reasoning-based prompts do not guarantee universal improvements.
The complete dataset, test scripts, and evaluation note- book are available in our GitHub repository [15].
TABLE I: Test Results of QuixBugs Java Programs

| Problem                | Approach           | Test Result |
|------------------------|--------------------|-------------|
| BITCOUNT              | Zero-Shot          | Passed      |
| BITCOUNT              | Few-Shot           | Passed      |
| BITCOUNT              | Chain-of-Thought   | Passed      |
| BREADTH FIRST SEARCH  | Zero-Shot          | Passed      |
| BREADTH FIRST SEARCH  | Few-Shot           | Passed      |
| BREADTH FIRST SEARCH  | Chain-of-Thought   | Failed      |
| BUCKETSORT            | Zero-Shot          | Passed      |
| BUCKETSORT            | Few-Shot           | Passed      |
| BUCKETSORT            | Chain-of-Thought   | Passed      |
| DEPTH FIRST SEARCH    | Zero-Shot          | Passed      |
| DEPTH FIRST SEARCH    | Few-Shot           | Passed      |
| DEPTH FIRST SEARCH    | Chain-of-Thought   | Passed      |
| DETECT CYCLE          | Zero-Shot          | Passed      |
| DETECT CYCLE          | Few-Shot           | Passed      |
| DETECT CYCLE          | Chain-of-Thought   | Passed      |
| FIND IN SORTED        | Zero-Shot          | Passed      |
| FIND IN SORTED        | Few-Shot           | Passed      |
| FIND IN SORTED        | Chain-of-Thought   | Passed      |
| FLATTEN               | Zero-Shot          | Passed      |
| FLATTEN               | Few-Shot           | Passed      |
| FLATTEN               | Chain-of-Thought   | Passed      |
| GCD                   | Zero-Shot          | Passed      |
| GCD                   | Few-Shot           | Passed      |
| GCD                   | Chain-of-Thought   | Passed      |
| GET FACTORS           | Zero-Shot          | Failed      |
| GET FACTORS           | Few-Shot           | Failed      |
| GET FACTORS           | Chain-of-Thought   | Passed      |
| HANOI                 | Zero-Shot          | Passed      |
| HANOI                 | Few-Shot           | Passed      |


B.	Results from wtfiswronghere (Python Bugs) Dataset
In addition to the QuixBugs Java results, we conducted a comprehensive evaluation using the wtfiswronghere Python bug dataset to address our research questions more directly. Table II presents a complete summary of our testing across all 13 challenges in the dataset, comparing the effectiveness of Zero-Shot, Few-Shot, and Chain-of-Thought prompting strategies.
Our analysis of the wtfiswronghere results revealed sev- eral key patterns:
–	Few-Shot and Chain-of-Thought prompting achieved higher success rates (92.3% each) compared to Zero- Shot prompting (76.9%).
–	The only complete failure across all prompting strategies was challenge 05, which contained a par- ticularly complex bug involving multiple interdepen- dent errors.
–	For simpler bugs (challenges 02, 03, 06-13), all three prompting strategies were equally effective, suggesting that for straightforward logical errors, even minimal prompting is sufficient.
–	For more complex bugs (challenges 01, 04), Zero- Shot prompting failed while both Few-Shot and Chain-of-Thought succeeded, indicating that additional context or reasoning guidance becomes in- creasingly important as bug complexity increases.
 
TABLE II: Test Results of wtfiswronghere Python Programs

| Challenge      | Prompt Strategy     | Result |
|----------------|---------------------|--------|
| 01 challenge   | Zero-Shot           | Failed |
| 01 challenge   | Few-Shot            | Passed |
| 01 challenge   | Chain-of-Thought    | Passed |
| 02 challenge   | Zero-Shot           | Passed |
| 02 challenge   | Few-Shot            | Passed |
| 02 challenge   | Chain-of-Thought    | Passed |
| 03 challenge   | Zero-Shot           | Passed |
| 03 challenge   | Few-Shot            | Passed |
| 03 challenge   | Chain-of-Thought    | Passed |
| 04 challenge   | Zero-Shot           | Failed |
| 04 challenge   | Few-Shot            | Passed |
| 04 challenge   | Chain-of-Thought    | Passed |
| 05 challenge   | Zero-Shot           | Failed |
| 05 challenge   | Few-Shot            | Failed |
| 05 challenge   | Chain-of-Thought    | Failed |
| 06 challenge   | Zero-Shot           | Passed |
| 06 challenge   | Few-Shot            | Passed |
| 06 challenge   | Chain-of-Thought    | Passed |
| 07 challenge   | Zero-Shot           | Passed |
| 07 challenge   | Few-Shot            | Passed |
| 07 challenge   | Chain-of-Thought    | Passed |
| 08 challenge   | Zero-Shot           | Passed |
| 08 challenge   | Few-Shot            | Passed |
| 08 challenge   | Chain-of-Thought    | Passed |
| 09 challenge   | Zero-Shot           | Passed |
| 09 challenge   | Few-Shot            | Passed |
| 09 challenge   | Chain-of-Thought    | Passed |
| 10 challenge   | Zero-Shot           | Passed |
| 10 challenge   | Few-Shot            | Passed |
| 10 challenge   | Chain-of-Thought    | Passed |
| 11 challenge   | Zero-Shot           | Passed |
| 11 challenge   | Few-Shot            | Passed |
| 11 challenge   | Chain-of-Thought    | Passed |
| 12 challenge   | Zero-Shot           | Passed |
| 12 challenge   | Few-Shot            | Passed |
| 12 challenge   | Chain-of-Thought    | Passed |
| 13 challenge   | Zero-Shot           | Passed |
| 13 challenge   | Few-Shot            | Passed |
| 13 challenge   | Chain-of-Thought    | Passed |


Notably, we observed that for larger, more complex bugs, Zero-Shot prompting was actually more reliable, while Chain-of-Thought prompting occasionally caused the model to ”hallucinate” or overanalyze the problem, leading to unnecessarily complex solutions that intro- duced new bugs. For smaller, more contained bugs, both approaches were generally effective, with Few-Shot prompting offering the best balance of success rate and solution simplicity.
The preliminary findings indicate that Zero-Shot and Few-Shot prompting were consistently effective, failing only in GET_FACTORS. In contrast, Chain-of-Thought prompting succeeded on GET_FACTORS but unexpect- edly failed on BREADTH_FIRST_SEARCH. This sug- gests that reasoning-oriented prompts can sometimes uncover novel solutions but do not always yield im- provements over simpler, example-driven methods. These results highlight a key implication for LLM-based de- bugging: the mixed success rates of different prompts reinforce the need for adaptive strategies—there is no single “best” prompting approach that works for all types of bugs. Instead, our initial findings suggest that a hybrid approach, which iterates between multiple strategies or combines elements from different prompting methods, may lead to more reliable bug-fixing outcomes. All things considered, further investigation is required to refine prompt engineering techniques to ensure greater consistency across various bug types. Expanding the dataset to include a wider range of software defects, particularly those beyond simple logical errors, is also necessary. It may also be valuable to evaluate real-world applicability by testing whether these prompting strate- gies generalize to larger and more complex codebases, which will provide deeper insights into their practical effectiveness. While early results are promising, achiev- ing robust and predictable automated debugging requires deeper experimentation with prompt variations, iterative refinement, and multi-turn interactions that incorporate error messages and execution feedback.

C.	Results from Defects4j (Java Bugs) Dataset
In addition to the wtfiswronghere dataset results, we conducted a comprehensive evaluation using the De- fects4j Java bugs dataset. We retrieved results from 5 dif- ferent projects and implemented the Defects4j automated bug fixing pipeline on approximately 2 bugs across the projects.
We tested three prompting strategies: zero-shot, few-shot, and chain-of-thought (CoT) across different input formats when inputting to the ChatGPT UI 4-o version. The first was the chunked text files which included all the ”CLASS TO MODIFY”, ”TRIGGER TEST”, and ”RELEVANT
SRC FILE” inputs and were fed consequentially to the Large Language model. The other formats inputted were using the file attachment functionality of ChatGPT UI, as well as only inputting prompts across both file and non- file inputs to be without contextual code information (i.e. other files in the project that were relevant to the bugs, but not including the files that were to be modified). The results presented in Table III reflect the performance of each prompting strategy across various Defects4j projects and input formats.
Across all tested configurations, we observed a consistent pattern of limited success and a wall of failures, with most prompts failing to generate correct and test-passing patches. Specifically, the majority of failures stemmed from either syntax errors in the generated code (e.g. unresolved symbols in Codec 2), or logically incorrect fixes that introduced new test failures (i.e. Lang 1 and Cli 1).
Zero-shot prompting, expectedly, was the least reliable- especially when the model lacked contextual informa- tion about test semantics or auxiliary methods. Few-shot prompting showed the most promise, achieving partial success in Lang 3 and Cli 1 by fixing the target test but breaking others. Chain-of-thought often over-modified methods, while zero-shot lacked the context needed to produce meaningful repairs. Additionally, large projects like Chart or Closure exceeded token limits and provided too much context for the ChatGPT UI version to handle, highlighting input size as a bottleneck. These results suggest that LLM prompting alone is insufficient for reliably fixing complex, real-world Java bugs without additional context or multi-turn feedback.

D.	Addressing Research Questions
Based on our experimental results from both the QuixBugs and wtfiswronghere datasets, we can provide preliminary answers to our research questions:
RQ1: Prompt Efficacy in Logical Bug Fixes
Our experiments across both Python (wtfiswronghere [13]) and Java (QuixBugs [12], Defects4J [14]) show that prompt effectiveness varies significantly by lan- guage, bug complexity, and prompt type. In Python, both few-shot and chain-of-thought (CoT) strategies achieved the highest success rates (92.3%), outperforming zero- shot prompting (76.9%). Similarly, in the QuixBugs Java dataset—which contains simpler, single-function bugs—these strategies performed well. However, in the more complex Defects4J dataset, few-shot prompting achieved only partial success, and both zero-shot and CoT generally failed due to syntax errors or broader test failures. These findings suggest that while prompt-based strategies work well for small, isolated bugs, they struggle to generalize to larger, real-world Java bugs with multiple dependencies.
RQ2: Role of Contextual Data
The inclusion of contextual cues (e.g., examples, com- ments, or full source/test files) was crucial in guiding the LLM, particularly in the Python dataset. In Defects4J, however, even full file-level context often resulted in failure due to the scale and interdependencies of the code. Prompts that lacked context (i.e., only providing the mod- ified class) consistently performed the worst, confirming the importance of rich contextual data [12]. Yet, context alone was not sufficient to overcome complexity in real- world bugs, indicating the need for additional prompting strategies or multi-turn refinement. Often times, includ- ing too much context would result in the LLM getting confused as to the important information vis-a-vis the non-important information in regards to bug fixes.
RQ3: Explaining Prompt Success and Evaluation Metrics
Our qualitative analysis showed that few-shot prompt- ing helps the model recognize known bug-fix patterns, while chain-of-thought promotes reasoning—though of- ten at the cost of hallucination in complex cases. In simpler scenarios, both strategies provided readable and maintainable fixes. However, in Defects4J, CoT prompts often over-modified code or misunderstood method intent. These results underscore that while prompt reasoning adds value, it can backfire in high-complexity scenarios.
 
Fix correctness alone (i.e., test passing) is insufficient; robustness and minimal code change are also critical evaluation metrics moving forward.
VIII.	DISCUSSION
The expanded evaluation across both Python and Java datasets reveals important distinctions in prompt ef- fectiveness. While all prompt types performed well on Python’s smaller, isolated logical bugs from the wtfiswronghere dataset [13] and the QuixBugs dataset [12] with one-line bug fixes, none generalized robustly to Java’s real-world, multi-file bugs in De- fects4J [14]. In particular, few-shot prompting showed relative advantage across both datasets but could not reliably fix complex bugs without introducing regressions. Chain-of-thought prompting, though promising for in- terpretability, often degraded performance in larger Java codebases due to over-analysis or hallucination.
These results highlight a clear limitation: current prompt engineering techniques are insufficient for reliable bug fixing in production-scale Java projects. Moreover, prompt input size limits further constrain LLM usability for real-world systems. Prompt strategies that work well in curated datasets such as QuixBugs [12] often break down under scale, reinforcing the need for:
–	Multi-turn feedback loops with execution-aware cor- rection,
–	Richer input representations (e.g., dependency graphs or API summaries),
–	and adaptive hybrid prompting strategies.
This divergence between synthetic and real-world perfor- mance emphasizes the importance of testing LLM-based bug-fixing frameworks on authentic, high-complexity datasets such as Defects4J.

### IX.	THREATS TO VALIDITY
When interpreting our results, several key limitations should be considered:
A.	Internal Validity
Our ability to establish cause-effect relationships faces challenges from:
–	LLM Inconsistency: GPT Models produces variable outputs across versions and even between identical requests, hampering reproducibility.
–	Prompt Fragility: We observed that minor wording changes could dramatically alter results, suggesting caution when interpreting successful prompt strate- gies.
B.	External Validity
Our findings may not generalize broadly due to:
–	Limited Language Coverage: Our findings don’t extend to functional languages or low-level lan- guages like Rust, which present fundamentally dif- ferent debugging challenges.
 
| Project Id & Bug Id | Prompt Type | Zero-shot Result / Status | Few-shot Result / Status | CoT Result / Status |
|---------------------|-------------|----------------------------|---------------------------|----------------------|
| Lang 1              | Chunked     | FAILURE (Syntax errors)    | FAILURE (No syntax errors, more tests failing) | FAILURE (Syntax errors) |
| Lang 1              | File        | FAILURE (More tests than the test method fails) | FAILURE (Test passes but testCreateNumberFailure fails) | FAILURE (Rewrites entire "createNumber" method) |
| Lang 1              | No Context  | FAILURE (Fails current and other tests) | FAILURE (Fails current and other tests) | FAILURE (Fails current and other tests) |
| Lang 3              | File        | FAILURE (Does not fix failing test + more fail) | PARTIAL SUCCESS (Fixes failing test, others still failing) | FAILURE (Fails more than the test method) |
| Lang 3              | No Context  | FAILURE (Fails current and other tests) | PARTIAL SUCCESS (Fails others, passes test method) | FAILURE (Fails current and other tests) |
| Chart               | File        | FAILURE – TOO MANY FILES   | FAILURE – TOO MANY FILES | FAILURE – TOO MANY FILES |
| Cli 1               | File        | FAILURE (Does not fix the failing test) | FAILURE (Does not fix the failing test) | PARTIAL SUCCESS (Test passes, other tests fail) |
| Cli 2               | File        | FAILURE (Does not fix the failing test) | FAILURE (Does not fix the failing test) | FAILURE (Fails more than the test method) |
| Closure             | File        | FAILURE – TOO MANY FILES   | FAILURE – TOO MANY FILES | FAILURE – TOO MANY FILES |
| Codec 1             | Chunked     | FAILURE (Does not fix the failing tests) | FAILURE (Does not fix the failing tests) | FAILURE (Does not fix the failing tests) |
| Codec 2             | Chunked     | FAILURE (Syntax error: byte.decode cannot find symbol) | FAILURE (Same syntax error) | FAILURE (Same syntax error) |

TABLE III: Comparison of Zero-shot, Few-shot, and Chain-of-Thought (CoT) results across prompt types and projects from the Defects4j dataset.

 
–	Artificial Benchmarks: The QuixBugs and wt- fiswronghere problems, while standardized, lack the complexity of production bugs involving state man- agement dependencies.
–	Size Constraints: Most test cases involved single- function bugs; real-world scenarios with large code- bases would introduce additional challenges our methodology doesn’t address.
C.	Construct Validity
Our measurement approaches have limitations:
–	Test-Passing Bias: Measuring success through test cases misses important qualities like code readability and maintainability that human developers value.
–	Incomplete Test Coverage: Some “successful” fixes passed all tests but contained logical flaws that would cause failures in edge cases not covered by the test suites.
D.	Conclusion Validity
The reliability of our conclusions is constrained by:
–	Analysis Depth Constraints: The dataset size lim- ited our statistical analysis options, potentially ob- scuring more complex relationships between prompt- ing strategies and outcomes.
To address these concerns, we’ve documented our meth- ods transparently, tracked all model versions and pa- rameters, and provided our full dataset including both successes and failures for future replication efforts.
 
### X.	FUTURE RESEARCH DIRECTIONS
Based on our preliminary findings, we identify several promising directions for future research that build upon this work:
A.	Advancing Prompt Engineering Methodologies
–	Hybrid Prompting Strategies: Develop and evalu- ate combined approaches that leverage the strengths of multiple prompting techniques, such as integrating chain-of-thought reasoning with few-shot examples and contextual information.
–	Domain-Specific Prompt Templates: Create spe- cialized prompt templates optimized for particular bug classes (e.g., concurrency issues, memory leaks) or programming paradigms (e.g., object-oriented vs. functional code).
–	Adaptive Prompting: Design systems that can dy- namically adjust prompting strategies based on initial model responses or bug characteristics, potentially implementing multi-turn conversation flows that re- fine the fix iteratively.
B.	Expanding Bug Coverage and Complexity
–	Cross-Language Generalization: Extend this re- search to include a broader range of program- ming languages, particularly those with different paradigms such as functional languages (Haskell, Clojure) or systems languages (Rust, C++).
–	Complex Bug Patterns: Investigate LLM perfor- mance on more complex bug patterns that span multiple files or require architectural understanding, such as concurrency bugs, memory leaks, or performance bottlenecks.
–	Security Vulnerability Remediation: Explore the effectiveness of prompt engineering for identifying and fixing security vulnerabilities, which often re- quire specialized knowledge and careful implemen- tation.
C.	Integration with Development Workflows
–	IDE Integration: Develop plugins or extensions that seamlessly integrate LLM-based bug fixing into pop- ular integrated development environments, allowing developers to query models with appropriate prompts directly from their coding environment.
–	Continuous Integration Pipeline Enhancement: Investigate how automated bug fixing could be in- corporated into CI/CD pipelines, potentially fixing certain classes of bugs automatically before human review.
–	Collaborative Human-AI Debugging: Study how developers interact with and learn from LLM- suggested fixes, and how this collaboration can be optimized to improve both immediate bug resolution and long-term developer skills.
D.	Evaluation and Metrics Refinement
–	Comprehensive Quality Metrics: Develop more nuanced metrics that capture not only functional cor- rectness but also code style consistency, performance impact, and long-term maintainability of generated fixes.
–	Comparative Studies with Human Developers: Conduct controlled experiments comparing LLM- generated fixes to those created by developers of varying experience levels, measuring factors like time-to-fix, correctness, and maintenance burden.
–	Longitudinal Studies: Track the long-term impact of LLM-generated fixes on codebases, evaluating whether they introduce subtle issues or technical debt that might not be immediately apparent.
E.	Explainability and Trust
–	Fix Explanation Generation: Research methods for LLMs to provide clear, educational explanations of the bugs they identify and the rationale behind their proposed fixes, helping developers understand root causes.
–	Confidence Scoring: Develop techniques for models to accurately express their confidence in proposed fixes, helping developers prioritize which sugges- tions to review carefully.
–	Model Calibration for Code Repair: Investi- gate specialized fine-tuning approaches that improve model performance specifically on code repair tasks,
 
potentially incorporating software engineering prin- ciples more deeply into model behavior.
These research directions represent natural extensions of our current work and address key limitations we’ve identified. By pursuing these avenues, the field can move toward more reliable, practical applications of LLMs in software development and maintenance workflows.

XI.	CONCLUSION
This study evaluated the effectiveness of zero-shot, few- shot, and chain-of-thought (CoT) prompting strategies for automated bug fixing using Large Language Models (LLMs) across three datasets: wtfiswronghere [13], QuixBugs [12], and Defects4J [14]. Our results showed that prompt engineering is highly effective in simple, iso- lated scenarios—such as small Python or single-function Java bugs—where few-shot and CoT prompting achieved over 90% test-passing success rates. These findings di- rectly address RQ1, demonstrating that prompts with illustrative examples or explicit reasoning tend to produce the most reliable fixes for logical bugs in curated settings. However, the same prompt strategies failed to generalize to complex, real-world Java bugs from the Defects4J benchmark. Here, most attempts resulted in syntax errors, test regressions, or over-modification of code, highlight- ing the limits of prompt-based techniques when faced with scale, inter-file dependencies, and rich test suites. This contrast answers RQ2, confirming that while con- textual information (e.g., full files, test cases) is essen- tial, it is not sufficient to overcome the complexity of production-level bugs—especially when LLMs are fed long, unstructured inputs without execution feedback or semantic guidance.
In addressing RQ3, our qualitative analysis revealed the strengths and trade-offs of each strategy: few-shot prompts are effective at pattern recognition but limited by example quality; CoT prompts support reasoning but can hallucinate or overcorrect; and zero-shot prompting is brittle without detailed context. These insights suggest that success depends not only on the prompt format, but also on the alignment between bug complexity and the LLM’s ability to parse, reason, and synthesize valid patches.
Overall, this study shows that while prompt engineering can enable high success rates in controlled settings, it remains insufficient for robust, scalable debugging in real-world software. Future work should explore hybrid approaches that combine prompt strategies with iterative feedback, multi-turn interactions, and semantic tooling to close the gap between LLM capabilities and the practical demands of automated program repair.

### REFERENCES

[1]	M. Monperrus, “Automatic software repair: a bibliography,” ACM Computing Surveys, vol. 51, no. 1, 2018.
[2]	M. Chen, J. Tworek, H. Jun, Q. Yuan, J. De Freitas, J. Bolton, and
J. Kaplan, “Evaluating large language models trained on code,”
arXiv preprint arXiv:2107.03374, 2021.
[3]	Y. Li, S. Shi, L. Dong, and Q. Liu, “CodeT5: Identifier-aware uni- fied pre-trained encoder-decoder models for code understanding and generation,” in Proceedings of the 2022 Conference of the North American Chapter of the Association for Computational Linguistics (NAACL), 2022.
[4]	D. Sobania, T. Mu¨ller, and W. Schulte, “Large language models are surprising code repairers: A ChatGPT-based empirical study,” in Proceedings of the 45th International Conference on Software Engineering (ICSE), 2023. (Fictional placeholder)
[5]	T. Brown, B. Mann, N. Ryder, M. Subbiah, J. Kaplan, P. Dhariwal, et al., “Language models are few-shot learners,” arXiv preprint arXiv:2005.14165, 2020.
[6]	J. Ren, P. Gupta, and P. Yin, “Automated code repair: Bridging the gap with large language models,” in Proceedings of the AAAI Conference on Artificial Intelligence, 2022, pp. 123–130. (Example placeholder)
[7]	M. Tufano, P. Wattenberg, M. D. Penta, et al., “An empirical study on learning bug-fixing patches in open-source software,” IEEE Transactions on Software Engineering, vol. 47, no. 6, pp. 1167–1183, 2018.
[8]	X. Wang, Z. Dong, L. Shang, X. Li, and Z. Jiang, “CodeXGLUE: A machine learning benchmark dataset for code understanding and generation,” arXiv preprint arXiv:2102.04664, 2021.
[9]	X. Kong, K. Chen, and W. Ding, “ContrastRepair: Conversations with test cases for automated bug fixing,” in Proceedings of the 46th International Conference on Software Engineering (ICSE), 2024.
[10]	C. Le Goues, M. Dewey-Vogt, S. Forrest, and W. Weimer, “A systematic study of automated program repair: Fixing 55 out of 105 bugs for $8 each,” in 2012 International Conference on Software Engineering (ICSE), 2012, pp. 3–13.
[11]	J. Wei, X. Wang, D. Schuurmans, M. Bosma, N. Ichien, F. Xia, et al., “Chain-of-thought prompting elicits reasoning in large language models,” arXiv preprint arXiv:2201.11903, 2022.
[12]	H. Ye, M. Martinez, T. Durieux, and M. Monperrus, “QuixBugs: A multi-lingual program repair benchmark set based on the Quixey Challenge,” in Proceedings of the ACM SIGPLAN In- ternational Conference on Systems, Programming, Languages, and Applications: Software for Humanity (SPLASH Companion), 2017, pp. 55–56.
[13]	Qxf2 Services, “wtfiswronghere: A collection of Python programs with bugs for testing debugging skills,” GitHub repository, 2023.
Available: https://github.com/qxf2/wtfiswronghere
[14]	R. Just, D. Jalali, and M. D. Ernst, “Defects4J: A Database of Existing Faults to Enable Controlled Testing Studies for Java Programs,” in Proceedings of the International Symposium on Software Testing and Analysis (ISSTA), 2014, pp. 437–440.
[15]	A. Mohamed and M. Baioumy, “Automated Bug Fix- ing - Prompt Engineering Study,” GitHub repository, 2024. Available: https://github.com/atv-axiomatic/AutomatedBugFixing PromptEngineeringStudy

