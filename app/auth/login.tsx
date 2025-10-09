import { setAgent } from "@/store/agentSlice";
import { useAppDispatch } from "@/store/hook";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginAgent, getToken, getSavedAgent } from "@/services/auth"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("");


  const router = useRouter();
  const dispatch = useAppDispatch();

  // Auto-redirect if already logged in
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const saved = await getSavedAgent();
        if (saved?.id) {
          // ✅ now just dispatch setAgent
          dispatch(
            setAgent({
              id: saved.id,
              name: saved.name,
              token: token,
            })
          );
          router.replace("/dashboard");
        }
      }
    })();
  }, []);

  const togglePasswordVisibility = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email) return Alert.alert("Please enter your email");
    if(emailError) return Alert.alert("Validation", emailError)

    try {
      setLoading(true);
      const data = await loginAgent(email, password);

      // ✅ update Redux with id, name, token
      dispatch(
        setAgent({
          id: data.agent.id,
          name: data.agent.name || "",
          token: data.token,
        })
      );

      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert("Login failed", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };



  // Regex for basic email validation
  const validateEmail = (text: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    setEmail(text);
  };
return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
  >
    {/* Status bar fix */}
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />

    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Main container */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Image source={require("../auth/avtar.png")} style={styles.avatar} />
          </View>
          <Text style={styles.title}>Login to your account</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Mail color="#757575" size={22} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9e9e9e"
            />
          </View>
          {emailError !== "" && (
            <Text style={{ color: "red", marginLeft: 10 }}>{emailError}</Text>
          )}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Lock color="#757575" size={22} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholderTextColor="#9e9e9e"
            />
            <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              {showPassword ? (
                <Eye color="#757575" size={22} />
              ) : (
                <EyeOff color="#757575" size={22} />
              )}
            </Pressable>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={emailError !== ""}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  form: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#333",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "#e53935",
    marginBottom: 16,
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
