import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ResumeDocument {
  id: string;
  uid: string;
  title: string;
  template: string;
  atsScore: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Full resume data stored as a snapshot
  data: Record<string, unknown>;
}

export interface ActivityDocument {
  id: string;
  uid: string;
  text: string;
  type: "edit" | "download" | "view" | "create" | "ats";
  createdAt: Timestamp;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resumesCol(uid: string) {
  return collection(db, "users", uid, "resumes");
}

function activityCol(uid: string) {
  return collection(db, "users", uid, "activity");
}

// ─── Resumes ──────────────────────────────────────────────────────────────────

/** Subscribe to a user's resumes in real-time */
export function subscribeToResumes(
  uid: string,
  cb: (resumes: ResumeDocument[]) => void
): Unsubscribe {
  const q = query(resumesCol(uid), orderBy("updatedAt", "desc"));
  return onSnapshot(q, (snap) => {
    const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResumeDocument));
    cb(docs);
  });
}

/** Create a new resume document for a user */
export async function createResume(
  uid: string,
  title: string,
  template: string,
  data: Record<string, unknown>
): Promise<string> {
  const ref = await addDoc(resumesCol(uid), {
    uid,
    title,
    template,
    atsScore: 0,
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await logActivity(uid, `You created "${title}"`, "create");
  return ref.id;
}

/** Update an existing resume */
export async function updateResume(
  uid: string,
  resumeId: string,
  title: string,
  atsScore: number,
  data: Record<string, unknown>
): Promise<void> {
  await updateDoc(doc(resumesCol(uid), resumeId), {
    title,
    atsScore,
    data,
    updatedAt: serverTimestamp(),
  });
  await logActivity(uid, `You edited "${title}"`, "edit");
}

/** Delete a resume */
export async function deleteResume(uid: string, resumeId: string, title: string): Promise<void> {
  await deleteDoc(doc(resumesCol(uid), resumeId));
  await logActivity(uid, `You deleted "${title}"`, "edit");
}

// ─── Activity ─────────────────────────────────────────────────────────────────

/** Subscribe to a user's recent activity */
export function subscribeToActivity(
  uid: string,
  cb: (activities: ActivityDocument[]) => void
): Unsubscribe {
  const q = query(activityCol(uid), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ActivityDocument));
    cb(docs);
  });
}

/** Log a user activity event */
export async function logActivity(
  uid: string,
  text: string,
  type: ActivityDocument["type"]
): Promise<void> {
  await addDoc(activityCol(uid), {
    uid,
    text,
    type,
    createdAt: serverTimestamp(),
  });
}
