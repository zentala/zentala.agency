## 📁 Task Management Structure

### Task Organization

Tasks and their related files are stored in: `.claude/tasks/NNN_topic_or_goal/`

Where:
- `NNN` = 3-digit task number starting from `001`
- `topic_or_goal` = descriptive task name (kebab-case)

**Example:**
```
.claude/tasks/001_home_page/
.claude/tasks/002_light_theme/
.claude/tasks/003_contact_form/
```

### Task Number Sequencing

Task numbers are tracked in: `.claude/SEQUENCE.md`

**Process:**
1. Read current number from `SEQUENCE.md`
2. Create new task folder with that number
3. Increment number in `SEQUENCE.md` by 1

**Example SEQUENCE.md:**
```
002
```
(Next task will be 002, then update to 003)

### Task Folder Structure

Every task folder **MUST** contain:

1. **README.md** (mandatory, created first)
   - Task overview and business objective
   - Status and estimated effort
   - **Index of all files** in the task folder with descriptions
   - Links to detailed documentation
   - Key decisions summary
   - Architecture overview (if applicable)
   - Getting started guide
   - Success criteria
   - Contact & support info

2. **Detailed documentation files** (as needed)
   - Strategic plans
   - Content documents
   - Implementation guides
   - Scrum/Agile plans
   - Follow-up tasks
   - etc.

**Example structure:**
```
.claude/tasks/001_home_page/
├── README.md                              # Main index & overview
├── HOMEPAGE_REDESIGN_PLAN.md             # Strategic planning
├── HOMEPAGE_FINAL_CONTENT.md             # Content specification
├── IMPLEMENTATION_ARCHITECTURE.md         # Technical architecture
├── HOMEPAGE_IMPLEMENTATION_DECISIONS.md   # Approved decisions
├── SCRUM_PLAN_HOMEPAGE.md                # Sprint planning
└── HOMEPAGE_FOLLOW_UP_TASKS.md           # Post-launch backlog
```

### README.md Template

Every task README.md should include:

```markdown
# Task NNN: [Task Name]

## 📋 Task Overview
- Goal
- Status
- Assigned to
- Estimated effort
- Priority

## 🎯 Business Objective
[Why this task matters]

## 📚 Documentation Index
[Links to all files in folder with descriptions]

## ✅ Key Decisions
[Important decisions made]

## 🏗️ Architecture Overview (if applicable)
[Technical approach]

## 📅 Timeline/Plan Summary
[Sprint plan, phases, or timeline]

## 🎯 Success Criteria
[What "done" looks like]

## 🚀 Getting Started
[How to start working on this]

## 📊 Dependencies & Blockers
[What's needed, what's blocking]

## 📈 Roadmap/Follow-up
[What comes after]

## 📝 Notes & Learnings
[Important context, decisions rationale]

## 🔗 Related Resources
[Links to external resources, other pages]

## ✅ Task Completion Checklist
[Step-by-step completion tracking]

## 📞 Contact & Support
[Who to ask for help]
```

### File Naming Conventions

- **Task folders:** `NNN_kebab-case-name/`
- **README:** Always `README.md` (uppercase)
- **Documentation files:** `SCREAMING_SNAKE_CASE.md` for clarity
- **Code examples:** `kebab-case.astro` or `kebab-case.tsx`

### When to Create a Task

Create a new task folder when:
- Starting a new feature or significant change
- Project requires multiple documentation files
- Work spans multiple sprints/weeks
- Multiple developers will collaborate
- Need to track progress and decisions

**Don't create task for:**
- Quick bug fixes (<1 hour)
- Single file changes
- Trivial updates

### Moving Files to Tasks

**IMPORTANT: Always use console commands to move files, NEVER use Claude tools (Write/Edit/Read)!**

**Correct way (PowerShell):**
```powershell
Move-Item -Path "FILE.md" -Destination ".claude/tasks/NNN_task_name/"
```

**Correct way (Bash):**
```bash
mv FILE.md .claude/tasks/NNN_task_name/
```

**Wrong way:**
```
❌ Using Write tool to copy file content
❌ Using Edit tool to move content
❌ Using any Claude file manipulation tools
```

**Why console only?**
- Preserves file metadata (timestamps, permissions)
- Atomic operation (no corruption risk)
- Git tracks as file move (not delete + create)
- Faster and more reliable
- Standard development practice

**When I say "move files" or "transfer files", always interpret this as:**
"Use `mv` command in bash or `Move-Item` in PowerShell to relocate files"

### Task Lifecycle

1. **Create:**
   - Read SEQUENCE.md to get next number
   - Create task folder: `.claude/tasks/NNN_task_name/`
   - Create README.md first
   - Add related documentation files
   - Update SEQUENCE.md (increment by 1)

2. **Work:**
   - Update README.md as task evolves
   - Add new documentation as needed
   - Keep README index up-to-date

3. **Complete:**
   - Update README.md status to "✅ Complete"
   - Add "Completed: YYYY-MM-DD" timestamp
   - Archive or keep for reference

4. **Reference:**
   - Link to task README from other documents
   - Use as template for similar tasks

### Cross-Referencing Tasks

When referencing other tasks:

```markdown
See also: [Task 001: Homepage Redesign](.claude/tasks/001_home_page/README.md)

Related to:
- Task 002: Light Theme Implementation
- Task 005: Analytics Integration
```

---

## 📝 General Project Guidelines

### Code Style
- Follow existing patterns in the codebase
- Use TypeScript for type safety
- Prefer composition over inheritance
- Keep components focused (single responsibility)

### Documentation
- Document WHY, not just WHAT
- Use JSDocs when useful
- Include examples for complex patterns
- Keep README files up-to-date
- Add comments for non-obvious code

### Git Commits
- Use conventional commits format
- Reference task numbers in commits
- Keep commits atomic and focused

### Testing
- Follow testing strategy in `LIGHT_THEME_IMPLEMENTATION_PLAN.md`
- Test responsive at all breakpoints
- Ensure cross-browser compatibility
- Run accessibility audits

### Performance
- Lazy load images below fold
- Minimize JavaScript bundle size
- Optimize images before committing
- Use lighthouse for performance checks

---

## 🚀 Quick Reference

**Create new task:**
```bash
# 1. Check next number
cat .claude/SEQUENCE.md

# 2. Create folder (example: 002)
mkdir -p .claude/tasks/002_task_name

# 3. Create README.md
# (Use template above)

# 4. Move related files
mv FILE.md .claude/tasks/002_task_name/

# 5. Update sequence
echo "003" > .claude/SEQUENCE.md
```

**Find task documentation:**
```bash
# List all tasks
ls .claude/tasks/

# Read task overview
cat .claude/tasks/001_home_page/README.md

# Find specific file
find .claude/tasks/001_home_page/ -name "*.md"
```

---

## 📋 Task Checklist Template

Copy this for each new task:

- [ ] Read SEQUENCE.md for next number
- [ ] Create task folder: `.claude/tasks/NNN_task_name/`
- [ ] Create README.md with full index
- [ ] Move/create related documentation files
- [ ] Update SEQUENCE.md (increment by 1)
- [ ] Link task from relevant project docs
- [ ] Update task README as work progresses
- [ ] Mark complete when done

---

## 🗂️ Task States & Locations

### Active Tasks
Located in: `.claude/tasks/NNN_task_name/`

These are tasks currently being worked on or ready to start.

### Backlog Tasks
Located in: `.claude/tasks/backlog/`

Unrefined ideas and future tasks that need planning before implementation. Tasks here don't have numbers yet - they're just markdown files with rough ideas.

**Backlog workflow:**
1. Create rough spec in `backlog/TASK_NAME.md`
2. When ready to start: read SEQUENCE.md, create numbered folder, move file
3. Create proper README.md structure
4. Update SEQUENCE.md

**Example:**
```bash
# In backlog
.claude/tasks/backlog/SEO_CONTENT_STRATEGY.md

# Ready to implement
cat .claude/SEQUENCE.md  # Shows: 004
mkdir .claude/tasks/004_seo_content_strategy
mv .claude/tasks/backlog/SEO_CONTENT_STRATEGY.md .claude/tasks/004_seo_content_strategy/
# Create README.md
echo "005" > .claude/SEQUENCE.md
```

### Completed Tasks
Located in: `.claude/tasks/done/`

Finished tasks moved here for archive and reference.

**Completion workflow:**
```bash
# Mark as complete in README.md first
# Then move entire folder
mv .claude/tasks/003_task_name .claude/tasks/done/
```

---

## 📋 Task Checklist Template

Copy this for each new task:

- [ ] Read SEQUENCE.md for next number
- [ ] Create task folder: `.claude/tasks/NNN_task_name/`
- [ ] Create README.md with full index
- [ ] Move/create related documentation files
- [ ] Update SEQUENCE.md (increment by 1)
- [ ] Link task from relevant project docs
- [ ] Update task README as work progresses
- [ ] Move to `.claude/tasks/done/` when complete

---

## 🔄 Self-Improvement Note

**Remember:** Update this file (.claude/CLAUDE.TASKS.md) when discovering better practices for task and work organization. This is a living document.

---

## 🎯 Priorities Alignment

**IMPORTANT:** Before working on tasks, always read [tasks/PRIORITIES.md](tasks/PRIORITIES.md) to understand current priorities aligned with Paweł.

**What's in PRIORITIES.md:**
- Current priorities (what's most important NOW)
- Strategic thinking & business goals
- Open questions & discussions
- Decision framework (impact vs effort)
- Workflow philosophy

**When to read it:**
- At start of session about tasks
- When choosing next task to work on
- When proposing new work
- When priorities seem unclear

**When to update it:**
- Priorities change (business needs shift)
- New strategic decisions made
- Questions answered or new ones emerge
- Learn something important about project direction

---

**Last Updated:** 2025-10-05
**Created:** 2025-10-03
