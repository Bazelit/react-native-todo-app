import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import useTheme from "../hooks/use-theme";
import { Button, Dialog, useToast } from "heroui-native";
import { useState } from "react";

const DangerZone = () => {
  const { colors } = useTheme();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const settingsStyles = createSettingsStyles(colors);

  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handleResetApp = async () => {
    try {
      const result = await clearAllTodos();
      toast.show({
        variant: "success",
        label: "App Reset",
        description: `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`,
      });
    } catch (error) {
      toast.show({
        variant: "danger",
        label: "Error deleting all todos",
        description: error as string,
      });
      console.error("Error deleting all todos:", error);
    }
  };

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <TouchableOpacity
            style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
            activeOpacity={0.7}
          >
            <View style={settingsStyles.actionLeft}>
              <LinearGradient
                colors={colors.gradients.danger}
                style={settingsStyles.actionIcon}
              >
                <Ionicons name="trash" size={18} color="#ffffff" />
              </LinearGradient>
              <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <View className="mb-5 gap-1.5">
              <View className="flex-row justify-between">
                <Ionicons name="trash" size={24} color="#DC3B3F" />
                <Dialog.Close variant="ghost" />
              </View>
              <Dialog.Title>Reset App</Dialog.Title>
              <Dialog.Description>
                This will delete ALL your todos permanently. This action cannot
                be undone.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onPress={() => {
                  handleResetApp();
                  setIsOpen(false);
                }}
              >
                Confirm
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </LinearGradient>
  );
};

export default DangerZone;
