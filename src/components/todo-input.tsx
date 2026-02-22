import { Button, Input, useToast } from "heroui-native";
import { View } from "react-native";
import useTheme from "../hooks/use-theme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { AntDesign } from "@expo/vector-icons";

const TodoInput = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);
  const { toast } = useToast();

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        toast.show({
          variant: "danger",
          label: "Error adding a task",
          description: error as string,
        });
        console.error("Error adding a task:", error);
      }
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <Input
          style={homeStyles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholder="Write a task to add..."
        />
        <Button onPress={handleAddTodo} isDisabled={!newTodo.trim()} isIconOnly>
          <AntDesign name="plus" size={24} color="#fff" />
        </Button>
      </View>
    </View>
  );
};

export default TodoInput;
