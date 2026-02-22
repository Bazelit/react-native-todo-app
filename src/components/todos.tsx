import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button, Dialog, Input, useToast } from "heroui-native";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "../hooks/use-theme";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "./empty-state";
import { useState } from "react";

type Todo = Doc<"todos">;

const Todos = () => {
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editingText, setEditingText] = useState("");

  const handelToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ todoId: id });
    } catch (error) {
      toast.show({
        variant: "danger",
        label: "Error toggling todo",
        description: error as string,
      });
      console.error("Error toggling todo:", error);
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {};

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };
  const handleSaveTodo = async () => {
    if (editingId && editingText) {
      try {
        await updateTodo({ todoId: editingId, text: editingText });
        setEditingId(null);
        setEditingText("");
      } catch (error) {
        toast.show({
          variant: "danger",
          label: "Error updating todo",
          description: error as string,
        });
        console.error("Error updating todo:", error);
      }
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handelToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkbox,
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color={"#fff"} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <Input
                style={homeStyles.editInput}
                value={editingText}
                onChangeText={setEditingText}
                autoFocus
                placeholder="Edit your todo..."
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveTodo} activeOpacity={0.7}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    opacity: 0.6,
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                <TouchableOpacity
                  onPress={() => handleEditTodo(item)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
                  <Dialog.Trigger asChild>
                    <TouchableOpacity
                      onPress={() => handleDeleteTodo(item._id)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={colors.gradients.danger}
                        style={homeStyles.actionButton}
                      >
                        <Ionicons name="trash" size={14} color="#fff" />
                      </LinearGradient>
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
                        <Dialog.Title>Delete Todo</Dialog.Title>
                        <Dialog.Description>
                          Are you sure you want to delete this todo?
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
                            deleteTodo({ todoId: item._id });
                            setIsOpen(false);
                          }}
                        >
                          Confirm
                        </Button>
                      </View>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item._id}
      style={homeStyles.todoList}
      contentContainerStyle={homeStyles.todoListContent}
      ListEmptyComponent={<EmptyState />}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default Todos;
