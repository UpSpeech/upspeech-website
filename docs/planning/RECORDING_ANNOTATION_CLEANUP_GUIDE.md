# Recording & Annotation Flow Cleanup - Implementation Guide

**Date:** 2025-12-10
**Status:** Phase 1 Complete (RecordingAnnotationPage created)
**Remaining:** 5 major tasks

---

## 📋 What's Already Done

### ✅ Phase 1: RecordingAnnotationPage Component
**Location:** `app-frontend/src/pages/RecordingAnnotationPage.tsx`

**Features:**
- Full-screen two-column layout (60% player, 40% annotations)
- Recording player with timeline markers
- Disfluency annotation panel (Repetition, Prolongation, Block)
- Therapy technique annotation panel (6 techniques)
- Inline note editing for annotations
- Real-time save to API
- Delete annotations
- Jump to timestamp on marker click

**Route Added:** `app-frontend/src/App.tsx`
```tsx
<Route
  path="/exercises/:assignmentId/recordings/:recordingId/annotate"
  element={
    <ProtectedLayout>
      <RecordingAnnotationPage />
    </ProtectedLayout>
  }
/>
```

---

## 🚧 Remaining Implementation Tasks

### Task 1: Update ExerciseCompletionModal
**File:** `app-frontend/src/components/exercises/ExerciseCompletionModal.tsx`

#### Changes Needed:

**1.1 Remove annotation state and UI (Lines ~68-72, ~546-730)**

Remove these state variables:
```tsx
// DELETE THESE
const [annotations, setAnnotations] = useState<DisfluencyAnnotation[]>([]);
const [techniqueAnnotations, setTechniqueAnnotations] = useState<TechniqueAnnotation[]>([]);
```

Remove these functions:
```tsx
// DELETE THESE
const addAnnotation = (type: ...) => { ... }
const addTechniqueAnnotation = (type: ...) => { ... }
const removeAnnotation = (index: number) => { ... }
const removeTechniqueAnnotation = (index: number) => { ... }
```

Remove the entire annotation UI section (around lines 546-730):
```tsx
// DELETE THIS ENTIRE SECTION
{recordedBlob && (
  <div className="space-y-4">
    <h3>Step 2: Annotate Your Recording</h3>
    {/* All the annotation buttons and lists */}
  </div>
)}
```

**1.2 Update handleSubmit to pass empty arrays**

Find the `handleSubmit` function (around line 294) and update:
```tsx
// BEFORE
await onSubmit({
  file: recordedFile,
  recording_type: recordingType,
  difficulty_rating: difficultyRating,
  notes_from_patient: patientNotes,
  disfluency_annotations: annotations,        // ← Remove these
  technique_annotations: techniqueAnnotations, // ← Remove these
});

// AFTER
await onSubmit({
  file: recordedFile,
  recording_type: recordingType,
  difficulty_rating: difficultyRating,
  notes_from_patient: patientNotes,
  disfluency_annotations: [],        // ← Empty arrays
  technique_annotations: [],         // ← Empty arrays
});
```

**1.3 Simplify the modal header**

Update the modal header from:
```tsx
<Modal.Header>
  <div className="text-2xl font-bold">
    {t("exercises.completion.title")} - {assignment.mini_game.title}
  </div>
</Modal.Header>
```

To emphasize it's just for recording:
```tsx
<Modal.Header>
  <div className="text-2xl font-bold">
    {t("exercises.completion.record_title", "Record Your Practice")} - {assignment.mini_game.title}
  </div>
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
    {t("exercises.completion.record_subtitle", "Record yourself practicing. You'll annotate it on the next screen.")}
  </p>
</Modal.Header>
```

**1.4 Update submit button text**

Change from "Submit" to "Save & Continue to Annotate":
```tsx
<Button
  type="submit"
  variant="primary"
  disabled={!recordedBlob || isSubmitting}
>
  {isSubmitting ? (
    <>
      <LoadingSpinner size="sm" />
      <span className="ml-2">{t("common.submitting")}</span>
    </>
  ) : (
    t("exercises.completion.continue_to_annotate", "Save & Continue to Annotate")
  )}
</Button>
```

---

### Task 2: Update MyExercisesPage to Redirect After Completion
**File:** `app-frontend/src/pages/MyExercisesPage.tsx`

#### Changes Needed:

**2.1 Add useNavigate hook**

At the top of the component:
```tsx
import { useNavigate } from "react-router-dom";

export const MyExercisesPage: React.FC = () => {
  const navigate = useNavigate();
  // ... rest of component
```

**2.2 Update handleCompleteWithRecording**

Find the function (around line 325) and update to redirect:
```tsx
const handleCompleteWithRecording = async (data: {
  file: File;
  recording_type: "audio_only" | "video_and_audio";
  difficulty_rating: number;
  notes_from_patient: string;
  disfluency_annotations: Array<{...}>;
  technique_annotations: Array<{...}>;
}) => {
  if (!completionAssignment) return;

  try {
    // Call API to save recording
    const response = await apiClient.completeMiniGameAssignmentWithRecording(
      completionAssignment.id,
      data,
    );

    // Get the recording ID from the response
    const recordingId = response.data.recording?.id;

    // Close modal
    setCompletionAssignment(null);

    // Redirect to annotation page if recording was created
    if (recordingId) {
      navigate(`/exercises/${completionAssignment.id}/recordings/${recordingId}/annotate`);
    } else {
      // Fallback: refresh the list
      fetchAssignments();
      fetchStatistics();
    }

    setError(null);
  } catch (err) {
    console.error("Error completing mini game with recording:", err);
    setError(extractErrorMessage(err));
    throw err;
  }
};
```

---

### Task 3: Update ExerciseDetailsModal to Remove Edit Mode
**File:** `app-frontend/src/components/exercises/ExerciseDetailsModal.tsx`

#### Changes Needed:

**3.1 Remove edit mode state**

Find and delete (around lines 130-135):
```tsx
// DELETE THESE
const [isEditMode, setIsEditMode] = useState(false);
const [editingAnnotationId, setEditingAnnotationId] = useState<number | null>(null);
const [editNotes, setEditNotes] = useState("");
```

**3.2 Remove edit-related functions**

Delete these functions:
```tsx
// DELETE THESE
const handleStartEditNotes = (annotationId: number, currentNotes: string) => {...}
const handleSaveNotes = async (annotationId: number) => {...}
const handleDeleteAnnotation = async (annotationId: number) => {...}
const handleAddAnnotation = async (type: string) => {...}
```

**3.3 Update CompletionTimeline section to be readonly**

Find the section where recordings are displayed (around line 335) and update:

**BEFORE:**
```tsx
<div className="flex items-center justify-between mb-3">
  <h4>Full Recording</h4>
  <Button
    variant={isEditMode ? "success" : "secondary"}
    onClick={() => setIsEditMode(!isEditMode)}
    icon={<PencilIcon className="w-4 h-4" />}
  >
    {isEditMode ? "Done Editing" : "Edit Annotations"}
  </Button>
</div>
```

**AFTER:**
```tsx
<div className="flex items-center justify-between mb-3">
  <h4>Full Recording</h4>
  {/* Add "Annotate" button for patients, "Review & Annotate" for therapists */}
  {isClient ? (
    <Button
      variant="primary"
      size="sm"
      onClick={() => navigate(`/exercises/${assignment.id}/recordings/${recording.id}/annotate`)}
      icon={<PlusIcon className="w-4 h-4" />}
    >
      {t("exercises.recording.add_more_annotations", "Add More Annotations")}
    </Button>
  ) : isTherapist ? (
    <Button
      variant="primary"
      size="sm"
      onClick={() => navigate(`/exercises/${assignment.id}/recordings/${recording.id}/annotate`)}
      icon={<PencilIcon className="w-4 h-4" />}
    >
      {t("exercises.recording.review_and_annotate", "Review & Annotate")}
    </Button>
  ) : null}
</div>
```

**3.4 Remove inline editing UI**

Find where annotations are displayed and make them readonly:

**BEFORE:**
```tsx
{editingAnnotationId === annotation.id ? (
  <div className="mt-2">
    <Textarea value={editNotes} onChange={...} />
    <Button onClick={() => handleSaveNotes(annotation.id)}>Save</Button>
    <Button onClick={() => setEditingAnnotationId(null)}>Cancel</Button>
  </div>
) : (
  <>
    {annotation.notes && <p>{annotation.notes}</p>}
    <Button onClick={() => handleStartEditNotes(...)}>Edit</Button>
    <Button onClick={() => handleDeleteAnnotation(...)}>Delete</Button>
  </>
)}
```

**AFTER:**
```tsx
{/* Readonly view */}
{annotation.notes && (
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
    {annotation.notes}
  </p>
)}
```

**3.5 Remove "Add Annotation Controls" section**

Delete the entire section (around lines 515-560):
```tsx
// DELETE THIS ENTIRE SECTION
{isEditMode && (
  <div className="mt-4 p-4 bg-blue-50...">
    <p>Add Annotation at Current Time ({currentTime.toFixed(1)}s)</p>
    <Button onClick={() => handleAddAnnotation("repetition")}>Repetition</Button>
    <Button onClick={() => handleAddAnnotation("prolongation")}>Prolongation</Button>
    <Button onClick={() => handleAddAnnotation("block")}>Block</Button>
  </div>
)}
```

**3.6 Add useNavigate import**

At the top of the file:
```tsx
import { useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline"; // Add icons

export const ExerciseDetailsModal: React.FC<...> = ({ ... }) => {
  const navigate = useNavigate();
  // ... rest
```

---

### Task 4: Add annotator_type to Database
**File:** Create new migration in `app-backend/db/migrate/`

#### Run migration generator:
```bash
cd app-backend
bin/rails generate migration AddAnnotatorTypeToAnnotations
```

#### Edit the generated migration file:

```ruby
class AddAnnotatorTypeToAnnotations < ActiveRecord::Migration[8.0]
  def change
    # Add annotator_type to both annotation tables
    add_column :disfluency_annotations, :annotator_type, :string, default: 'patient', null: false
    add_column :technique_annotations, :annotator_type, :string, default: 'patient', null: false

    # Add index for filtering
    add_index :disfluency_annotations, :annotator_type
    add_index :technique_annotations, :annotator_type

    # Add comment for clarity
    reversible do |dir|
      dir.up do
        execute <<-SQL
          COMMENT ON COLUMN disfluency_annotations.annotator_type IS 'Who created this annotation: patient or therapist';
          COMMENT ON COLUMN technique_annotations.annotator_type IS 'Who created this annotation: patient or therapist';
        SQL
      end
    end
  end
end
```

#### Run the migration:
```bash
bin/rails db:migrate
```

---

### Task 5: Update API to Support annotator_type
**File:** `app-backend/app/controllers/api/v1/mini_game_assignments_controller.rb`

#### Changes Needed:

**5.1 Update create_annotation action**

Find the `create_annotation` method (around line 456) and add auto-detection of annotator_type:

```ruby
def create_annotation
  unless can_edit_annotations?(@assignment, @recording)
    response = ErrorResponse.forbidden(message: 'Unauthorized')
    render json: response[:error], status: response[:status]
    return
  end

  annotation_type = params[:annotation_type] # 'disfluency' or 'technique'

  # Auto-detect annotator_type based on current user's role
  annotator_type = determine_annotator_type(current_user)

  if annotation_type == 'disfluency'
    annotation = @recording.disfluency_annotations.build(
      timestamp_ms: params[:timestamp_ms].to_i,
      annotation_type: params[:disfluency_type],
      notes: params[:notes],
      annotator_type: annotator_type  # ← ADD THIS
    )
  elsif annotation_type == 'technique'
    annotation = @recording.technique_annotations.build(
      timestamp_ms: params[:timestamp_ms].to_i,
      technique_type: params[:technique_type],
      notes: params[:notes],
      annotator_type: annotator_type  # ← ADD THIS
    )
  else
    response = ErrorResponse.bad_request(message: 'Invalid annotation_type. Must be disfluency or technique.')
    render json: response[:error], status: response[:status]
    return
  end

  if annotation.save
    render json: {
      data: annotation_json(annotation, annotation_type),
      message: 'Annotation created successfully'
    }, status: :created
  else
    response = ErrorResponse.validation_failed(errors: annotation.errors.full_messages)
    render json: response[:error], status: response[:status]
  end
end
```

**5.2 Add helper method to determine annotator type**

Add this private method at the bottom of the controller:

```ruby
private

# ... existing private methods ...

def determine_annotator_type(user)
  # Therapists, admins, and owners are 'therapist' annotators
  # Patients (clients/members) are 'patient' annotators
  if user.therapist? || user.admin? || user.owner?
    'therapist'
  else
    'patient'
  end
end
```

**5.3 Update annotation_json to include annotator_type**

Find the `annotation_json` method (around line 844) and add annotator_type:

```ruby
def annotation_json(annotation, annotation_type)
  if annotation_type == 'disfluency'
    {
      id: annotation.id,
      timestamp_ms: annotation.timestamp_ms,
      timestamp: annotation.formatted_timestamp,
      annotation_type: annotation.annotation_type,
      notes: annotation.notes,
      clip_url: annotation.clip_url,
      annotator_type: annotation.annotator_type  # ← ADD THIS
    }
  else # technique
    {
      id: annotation.id,
      timestamp_ms: annotation.timestamp_ms,
      timestamp: annotation.formatted_timestamp,
      technique_type: annotation.technique_type,
      notes: annotation.notes,
      clip_url: annotation.clip_url,
      annotator_type: annotation.annotator_type  # ← ADD THIS
    }
  end
end
```

**5.4 Update recording_json to include annotator_type**

Find the `recording_json` method (around line 730) and update annotation mappings:

```ruby
disfluency_annotations: disfluency_annotations.map do |annotation|
  {
    id: annotation.id,
    timestamp_ms: annotation.timestamp_ms,
    timestamp: annotation.formatted_timestamp,
    annotation_type: annotation.annotation_type,
    notes: annotation.notes,
    clip_url: annotation.clip_url,
    annotator_type: annotation.annotator_type  # ← ADD THIS
  }
end,
technique_annotations: technique_annotations.map do |annotation|
  {
    id: annotation.id,
    timestamp_ms: annotation.timestamp_ms,
    timestamp: annotation.formatted_timestamp,
    technique_type: annotation.technique_type,
    notes: annotation.notes,
    clip_url: annotation.clip_url,
    annotator_type: annotation.annotator_type  # ← ADD THIS
  }
end,
```

**5.5 Update create_annotations_without_clips**

Find the `create_annotations_without_clips` method (around line 934) and set annotator_type:

```ruby
def create_annotations_without_clips(recording, disfluency_annotations_data, technique_annotations_data)
  # Auto-detect annotator type
  annotator_type = determine_annotator_type(current_user)

  # Create disfluency annotations
  disfluency_annotations_data.each do |annotation|
    recording.disfluency_annotations.create!(
      timestamp_ms: annotation['timestamp_ms'].to_i,
      annotation_type: annotation['annotation_type'],
      notes: annotation['notes'],
      annotator_type: annotator_type  # ← ADD THIS
    )
  end

  # Create technique annotations
  technique_annotations_data.each do |annotation|
    recording.technique_annotations.create!(
      timestamp_ms: annotation['timestamp_ms'].to_i,
      technique_type: annotation['technique_type'],
      notes: annotation['notes'],
      annotator_type: annotator_type  # ← ADD THIS
    )
  end

  Rails.logger.info("Created #{disfluency_annotations_data.length} disfluency and #{technique_annotations_data.length} technique annotations with annotator_type: #{annotator_type}")
end
```

**5.6 Update seeds to include annotator_type**

**File:** `app-backend/db/seeds.rb`

Find where annotations are created (around line 544) and add annotator_type:

```ruby
DisfluencyAnnotation.create!(
  audio_recording: recording,
  timestamp_ms: (i + 1) * 1000,
  annotation_type: disfluency_types.sample,
  clip_gcs_path: sample_video_url,
  annotator_type: 'patient'  # ← ADD THIS
)

TechniqueAnnotation.create!(
  audio_recording: recording,
  timestamp_ms: (i + 1) * 1500,
  technique_type: technique_types.sample,
  notes: ['Good use', 'Well executed', 'Improving', nil].sample,
  clip_gcs_path: sample_video_url,
  annotator_type: 'patient'  # ← ADD THIS
)
```

---

### Task 6: Update Frontend Types
**File:** `app-frontend/src/types/exercises.ts`

Add `annotator_type` to annotation interfaces:

```typescript
export interface DisfluencyAnnotation {
  id: number;
  timestamp_ms: number;
  timestamp: string;
  annotation_type: "repetition" | "prolongation" | "block";
  notes?: string;
  clip_url?: string;
  annotator_type: "patient" | "therapist";  // ← ADD THIS
}

export interface TechniqueAnnotation {
  id: number;
  timestamp_ms: number;
  timestamp: string;
  technique_type: string;
  notes?: string;
  clip_url?: string;
  annotator_type: "patient" | "therapist";  // ← ADD THIS
}
```

---

### Task 7: Update RecordingAnnotationPage to Show Annotator Type
**File:** `app-frontend/src/pages/RecordingAnnotationPage.tsx`

#### Add visual distinction for patient vs therapist annotations:

Find where annotations are rendered (around line 600) and add a badge:

```tsx
<div className="flex items-center gap-2">
  <button
    onClick={() => handleMarkerClick(annotation.timestamp_ms / 1000)}
    className="text-sm font-mono text-primary-600 dark:text-primary-400 hover:underline"
  >
    {formatTimestamp(annotation.timestamp_ms)}
  </button>

  <Badge
    variant={
      annotation.annotation_type === "repetition"
        ? "info"
        : annotation.annotation_type === "prolongation"
          ? "warning"
          : "danger"
    }
    size="sm"
  >
    {annotation.annotation_type}
  </Badge>

  {/* ADD THIS: Show who created the annotation */}
  {annotation.annotator_type === "therapist" && (
    <Badge variant="success" size="sm">
      {t("exercises.recording.therapist_annotation", "Therapist")}
    </Badge>
  )}
</div>
```

---

### Task 8: Remove ClipPlayer Complexity (Optional)
**Files to clean up:**

#### 8.1 Remove ClipPlayer component
```bash
rm app-frontend/src/components/recordings/ClipPlayer.tsx
```

#### 8.2 Remove ClipPlayer imports

In `ExerciseDetailsModal.tsx`:
```tsx
// DELETE THIS
import { ClipPlayer } from "@/components/recordings/ClipPlayer";
```

#### 8.3 Remove "Show Clip" toggle functionality

Find all instances of:
```tsx
// DELETE THESE
const [expandedClips, setExpandedClips] = useState<Record<number, boolean>>({});
const toggleClip = (annotationId: number) => {...}
```

And remove the "Show Clip" buttons:
```tsx
// DELETE THIS
<Button
  onClick={() => toggleClip(annotation.id)}
  icon={expandedClips[annotation.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
>
  {expandedClips[annotation.id] ? "Hide Clip" : "Show Clip"}
</Button>

{/* DELETE THIS */}
{expandedClips[annotation.id] && (
  <ClipPlayer
    src={recording.file_url}
    timestampMs={annotation.timestamp_ms}
    bufferSeconds={recording.clip_buffer_seconds}
  />
)}
```

---

## 🧪 Testing Checklist

### Patient Flow:
- [ ] Patient can record audio/video in ExerciseCompletionModal
- [ ] After recording, modal shows simplified UI (no annotation fields)
- [ ] Submit button says "Save & Continue to Annotate"
- [ ] After submit, patient is redirected to RecordingAnnotationPage
- [ ] RecordingAnnotationPage loads with the new recording
- [ ] Patient can add disfluency annotations
- [ ] Patient can add therapy technique annotations
- [ ] Patient can edit notes on annotations
- [ ] Patient can delete annotations
- [ ] Clicking timestamp in annotations list jumps to that time
- [ ] "Save & Exit" returns to exercises list
- [ ] Patient can later click "Add More Annotations" to return to annotation page
- [ ] Patient annotations show with "patient" annotator_type

### Therapist Flow:
- [ ] Therapist can view patient's completed recordings
- [ ] ExerciseDetailsModal shows recordings in readonly mode
- [ ] "Review & Annotate" button appears for therapists
- [ ] Clicking button opens RecordingAnnotationPage
- [ ] Therapist can see patient's existing annotations (readonly in timeline)
- [ ] Therapist can add their own annotations
- [ ] Therapist annotations are saved with "therapist" annotator_type
- [ ] Therapist annotations show with "Therapist" badge
- [ ] Both patient and therapist annotations appear on timeline with different colors

### API Testing:
- [ ] POST /api/v1/mini_game_assignments/:id/complete_with_recording works with empty annotation arrays
- [ ] POST /api/v1/mini_game_assignments/:id/annotations creates annotation with correct annotator_type
- [ ] GET /api/v1/mini_game_assignments/:id returns annotations with annotator_type
- [ ] PATCH /api/v1/mini_game_assignments/:id/annotations/:annotation_id updates notes
- [ ] DELETE /api/v1/mini_game_assignments/:id/annotations/:annotation_id removes annotation

### Database:
- [ ] Migration adds annotator_type column with default 'patient'
- [ ] Existing annotations get 'patient' as default value
- [ ] New annotations from patients save as 'patient'
- [ ] New annotations from therapists save as 'therapist'

---

## 📝 Translation Keys Needed

Add these to `app-frontend/src/i18n/locales/en/exercises.json`:

```json
{
  "exercises": {
    "completion": {
      "record_title": "Record Your Practice",
      "record_subtitle": "Record yourself practicing. You'll annotate it on the next screen.",
      "continue_to_annotate": "Save & Continue to Annotate"
    },
    "recording": {
      "annotate_recording": "Annotate Your Recording",
      "review_and_annotate": "Review & Annotate",
      "add_more_annotations": "Add More Annotations",
      "therapist_annotation": "Therapist",
      "patient_annotation": "Patient",
      "annotation_instructions": "Play the recording and click a button below when you hear a disfluency.",
      "techniques_instructions": "Mark when you used a therapy technique.",
      "no_annotations": "No annotations yet. Add some as you watch.",
      "no_techniques": "No techniques marked yet.",
      "add_notes": "Add notes (optional)...",
      "current_time": "Current Time",
      "disfluency_annotations": "Disfluency Annotations",
      "therapy_techniques": "Therapy Techniques Used"
    }
  }
}
```

---

## 🎯 Summary of Changes

### Before:
- ❌ Two annotation interfaces (completion modal + edit mode)
- ❌ Confusing "Edit Mode" for both editing and adding
- ❌ Cramped modal UI for annotation work
- ❌ Clip complexity (full recording + individual clips)
- ❌ No separation between patient and therapist annotations

### After:
- ✅ ONE dedicated annotation page for all use cases
- ✅ Clear "Record" → "Annotate" flow for patients
- ✅ Clear "Review & Annotate" flow for therapists
- ✅ Full-screen workspace for detailed annotation work
- ✅ Simplified: only full recording with timeline markers
- ✅ Clear separation: patient vs therapist annotations with badges

---

## 🚀 Deployment Steps

1. **Merge changes** to development branch
2. **Run migrations:**
   ```bash
   cd app-backend
   bin/rails db:migrate
   ```
3. **Reset seeds** (optional, for fresh data):
   ```bash
   bin/rails db:seed
   ```
4. **Rebuild frontend:**
   ```bash
   cd app-frontend
   npm run build
   ```
5. **Test thoroughly** using checklist above
6. **Deploy to staging**
7. **User acceptance testing**
8. **Deploy to production**

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs: `tail -f app-backend/log/development.log`
3. Verify migration ran successfully: `bin/rails db:migrate:status`
4. Verify routes: `bin/rails routes | grep annotations`

---

**End of Implementation Guide**

Good luck with the implementation! 🎉
