/**
 * Resume Upload Screen — Select and upload resume with drag/drop style UI.
 * Now job-aware: shows the job you're applying for and passes jobId forward.
 */
import Avatar from "@/components/ui/Avatar";
import Header from "@/components/ui/Header";
import ProgressBar from "@/components/ui/ProgressBar";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_JOBS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResumeUploadScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = jobId ? DUMMY_JOBS.find((j) => j.id === jobId) : null;

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulate file selection
  const handleSelectFile = () => {
    setSelectedFile({ name: "JohnDoe_Resume_2025.pdf", size: "245 KB" });
  };

  // Simulate upload process with progress
  const handleUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Navigate to parsing/scoring screen with job context
          setTimeout(
            () =>
              router.push(
                jobId ? `/resume-parsing?jobId=${jobId}` : "/resume-parsing",
              ),
            300,
          );
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Upload Resume" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Job context banner */}
        {job && (
          <View style={styles.jobBanner}>
            <Avatar name={job.company} size={40} />
            <View style={styles.jobBannerInfo}>
              <Text style={styles.jobBannerLabel}>Applying for</Text>
              <Text style={styles.jobBannerTitle}>{job.title}</Text>
              <Text style={styles.jobBannerCompany}>{job.company}</Text>
            </View>
          </View>
        )}

        {/* Upload area */}
        <Pressable
          style={[styles.uploadZone, selectedFile && styles.uploadZoneActive]}
          onPress={handleSelectFile}
        >
          <View style={styles.uploadIcon}>
            <FontAwesome
              name={selectedFile ? "file-pdf-o" : "cloud-upload"}
              size={40}
              color={selectedFile ? Colors.success : Colors.secondary}
            />
          </View>
          {selectedFile ? (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>{selectedFile.size}</Text>
              <Pressable onPress={handleRemoveFile} style={styles.removeButton}>
                <FontAwesome
                  name="times-circle"
                  size={16}
                  color={Colors.danger}
                />
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.uploadTitle}>Tap to Select Resume</Text>
              <Text style={styles.uploadHint}>
                Supported formats: PDF, DOC, DOCX{"\n"}Maximum size: 10 MB
              </Text>
            </>
          )}
        </Pressable>

        {/* Upload progress */}
        {uploading && (
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>Uploading...</Text>
            <ProgressBar
              progress={uploadProgress}
              color={Colors.secondary}
              showLabel
            />
          </View>
        )}

        {/* Source options */}
        <Text style={styles.orText}>or import from</Text>
        <View style={styles.sourceRow}>
          <Pressable style={styles.sourceButton} onPress={handleSelectFile}>
            <FontAwesome name="folder-open" size={20} color={Colors.primary} />
            <Text style={styles.sourceLabel}>Files</Text>
          </Pressable>
          <Pressable style={styles.sourceButton} onPress={handleSelectFile}>
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.sourceLabel}>Drive</Text>
          </Pressable>
          <Pressable style={styles.sourceButton} onPress={handleSelectFile}>
            <FontAwesome name="dropbox" size={20} color="#0061FF" />
            <Text style={styles.sourceLabel}>Dropbox</Text>
          </Pressable>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <FontAwesome name="lightbulb-o" size={18} color={Colors.warning} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Tips for Better Parsing</Text>
            <Text style={styles.tipsText}>
              • Use a clean, well-formatted resume{"\n"}• Include clear section
              headings{"\n"}• Avoid images or complex layouts{"\n"}• PDF format
              recommended for best results
            </Text>
          </View>
        </View>

        {/* Upload button */}
        <ThemedButton
          title={uploading ? "Uploading..." : "Upload & Parse Resume"}
          onPress={handleUpload}
          disabled={!selectedFile || uploading}
          loading={uploading}
          fullWidth
          size="lg"
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32, flexGrow: 1 },
  jobBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    backgroundColor: `${Colors.primary}08`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Colors.primary}20`,
    marginBottom: 20,
    marginTop: 4,
  },
  jobBannerInfo: { flex: 1 },
  jobBannerLabel: { fontSize: 11, color: Colors.muted, fontWeight: "500" },
  jobBannerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text.primary,
    marginTop: 1,
  },
  jobBannerCompany: { fontSize: 13, color: Colors.text.secondary },
  uploadZone: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    backgroundColor: `${Colors.secondary}04`,
    marginBottom: 20,
  },
  uploadZoneActive: {
    borderColor: Colors.success,
    borderStyle: "solid",
    backgroundColor: `${Colors.success}06`,
  },
  uploadIcon: { marginBottom: 16 },
  uploadTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 6,
  },
  uploadHint: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
  fileInfo: { alignItems: "center", gap: 4 },
  fileName: { fontSize: 16, fontWeight: "600", color: Colors.text.primary },
  fileSize: { fontSize: 13, color: Colors.muted },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  removeText: { fontSize: 13, color: Colors.danger, fontWeight: "500" },
  progressSection: { marginBottom: 20, gap: 8 },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  orText: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 12,
  },
  sourceRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  sourceButton: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sourceLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  tipsCard: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    backgroundColor: `${Colors.warning}08`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Colors.warning}20`,
  },
  tipsContent: { flex: 1 },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 6,
  },
  tipsText: { fontSize: 12, color: Colors.text.secondary, lineHeight: 20 },
});
