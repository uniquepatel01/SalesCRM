import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// CustomDropdown component
import { FlatList, Modal } from "react-native";

type CustomDropdownProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
  data: string[];
  value: string;
  onSelect: (val: string) => void;
};

const CustomDropdown = ({
  title,
  visible,
  onClose,
  data,
  value,
  onSelect,
}: CustomDropdownProps) => {
  const [search, setSearch] = useState("");
  const filtered = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={dropdownModalStyles.overlay}>
        <View style={dropdownModalStyles.modal}>
          <Text style={dropdownModalStyles.title}>{title}</Text>
          <View style={dropdownModalStyles.searchRow}>
            <TextInput
              style={dropdownModalStyles.searchInput}
              placeholder={`Search ${title}`}
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#888"
            />
            <Ionicons
              name="search"
              size={20}
              color="#222"
              style={{ marginLeft: 8 }}
            />
          </View>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={dropdownModalStyles.item}
                onPress={() => {
                  onSelect(item);
                  setSearch("");
                  onClose();
                }}
              >
                <Text style={{ color: "#222", fontSize: 16 }}>{item}</Text>
                {value === item && (
                  <Ionicons name="checkmark" size={18} color="#1da1f2" />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text
                style={{ color: "#888", textAlign: "center", marginTop: 20 }}
              >
                No results
              </Text>
            }
            style={{ maxHeight: 250 }}
          />
          <TouchableOpacity
            onPress={onClose}
            style={dropdownModalStyles.closeBtn}
          >
            <Text
              style={{ color: "#1da1f2", fontWeight: "bold", fontSize: 16 }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const dropdownModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    width: "85%",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#222" },
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    padding: 8,
    fontSize: 15,
    color: "#222",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  closeBtn: { alignSelf: "center", marginTop: 12 },
});

export default function AddLead() {
  // Dropdown states
  const [source, setSource] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessVolume, setBusinessVolume] = useState("");
  const [feedback, setFeedback] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);

  // Input states
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternate, setAlternate] = useState("");
  const [action, setAction] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  // Dummy handlers
  const handleSave = () => Alert.alert("Saved", "Lead information saved!");
  const handleCall = (number: string) => Alert.alert("Calling", number);
  const handleEmail = () => Alert.alert("Email", `Email sent to ${email}`);

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data.map((item: any) => item.name));
      });
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!country) {
      setStates([]);
      setState("");
      setCities([]);
      setCity("");
      return;
    }
    setLoadingStates(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStates(data.data.states.map((item: any) => item.name));
        setState("");
        setCities([]);
        setCity("");
      })
      .finally(() => setLoadingStates(false));
  }, [country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!country || !state) {
      setCities([]);
      setCity("");
      return;
    }
    setLoadingCities(true);
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, state }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data.data);
        setCity("");
      })
      .finally(() => setLoadingCities(false));
  }, [state]);

  // Filtered lists
  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );
  const filteredStates = states.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24} // adjust if you have a header
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Lead Entry</Text>
          <View style={{ width: 28 }} /> {/* Placeholder for alignment */}
        </View>

        {/* Dropdown Row 1 */}
        <View style={styles.row}>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={source}
              onValueChange={setSource}
              style={styles.picker}
              dropdownIconColor="#222"
            >
              <Picker.Item label="Source" value="" />
              <Picker.Item label="Referral" value="referral" />
              <Picker.Item label="Website" value="website" />
            </Picker>
          </View>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={businessType}
              onValueChange={setBusinessType}
              style={styles.picker}
              dropdownIconColor="#222"
            >
              <Picker.Item label="Business Type" value="" />
              <Picker.Item label="Retail" value="retail" />
              <Picker.Item label="Wholesale" value="wholesale" />
            </Picker>
          </View>
        </View>

        {/* Dropdown Row 2 */}
        <View style={styles.row}>
          <View style={styles.dropdownContainerFull}>
            <Picker
              selectedValue={businessVolume}
              onValueChange={setBusinessVolume}
              style={styles.picker}
              dropdownIconColor="#222"
            >
              <Picker.Item label="Business Volume" value="" />
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
          </View>
        </View>

        {/* Dropdown Row 3 */}
        <View style={styles.row}>
          <View style={styles.dropdownContainerFull}>
            <Picker
              selectedValue={feedback}
              onValueChange={setFeedback}
              style={styles.picker}
              dropdownIconColor="#222"
            >
              <Picker.Item label="Feedback" value="" />
              <Picker.Item label="Positive" value="positive" />
              <Picker.Item label="Negative" value="negative" />
            </Picker>
          </View>
        </View>

        {/* Text Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Company Name"
          placeholderTextColor="#888"
          value={companyName}
          onChangeText={setCompanyName}
        />

        {/* Country/State/City Row with Search */}
        <View style={styles.row}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownBtn}
              onPress={() => setCountryModal(true)}
            >
              <Text style={{ color: country ? "#222" : "#888", fontSize: 16 }}>
                {country || "Country"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#888" />
            </TouchableOpacity>
            <CustomDropdown
              title="Country"
              visible={countryModal}
              onClose={() => setCountryModal(false)}
              data={countries}
              value={country}
              onSelect={(val) => {
                setCountry(val);
                setState("");
                setCity("");
              }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownBtn}
              onPress={() => country && setStateModal(true)}
              disabled={!country}
            >
              <Text style={{ color: state ? "#222" : "#888", fontSize: 16 }}>
                {state || "State"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#888" />
            </TouchableOpacity>
            <CustomDropdown
              title="State"
              visible={stateModal}
              onClose={() => setStateModal(false)}
              data={states}
              value={state}
              onSelect={(val) => {
                setState(val);
                setCity("");
              }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownBtn}
              onPress={() => state && setCityModal(true)}
              disabled={!state}
            >
              <Text style={{ color: city ? "#222" : "#888", fontSize: 16 }}>
                {city || "City"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#888" />
            </TouchableOpacity>
            <CustomDropdown
              title="City"
              visible={cityModal}
              onClose={() => setCityModal(false)}
              data={cities}
              value={city}
              onSelect={setCity}
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
        />

        {/* Action Dropdown */}
        <View style={styles.dropdownContainerFull}>
          <Picker
            selectedValue={action}
            onValueChange={setAction}
            style={styles.picker}
            dropdownIconColor="#222"
          >
            <Picker.Item label="ACTION" value="" />
            <Picker.Item label="Follow Up" value="followup" />
            <Picker.Item label="Close" value="close" />
          </Picker>
        </View>

        {/* Email/Mobile/Alternate with Action Buttons */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Enter Email Address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
            <Text style={styles.actionBtnText}>E-mail</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Enter Mobile No."
            placeholderTextColor="#888"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleCall(mobile)}
          >
            <Text style={styles.actionBtnText}>Call</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Enter Alternate No."
            placeholderTextColor="#888"
            value={alternate}
            onChangeText={setAlternate}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleCall(alternate)}
          >
            <Text style={styles.actionBtnText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Save/Call Buttons */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => handleCall(mobile)}
          >
            <Text style={styles.callBtnText}>CALL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#111",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    marginRight: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: "center",
  },
  dropdownContainerFull: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: "center",
  },
  picker: {
    height: 55,
    color: "#222",
    fontSize: 16,
    width: "100%",
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  actionBtn: {
    backgroundColor: "#1da1f2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 24,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#1da1f2",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  callBtn: {
    flex: 1,
    backgroundColor: "#19c37d",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginLeft: 8,
  },
  callBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  dropdownSearch: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: "#222",
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  searchBtn: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    marginLeft: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  dropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
});
