import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopStore } from "../store/useShopStore";
import { colors } from "../theme/colors";

type Props = {
    navigation: any;
};

export default function ProfileScreen({ navigation }: Props) {
    const user = useShopStore((state) => state.user);
    const logout = useShopStore((state) => state.logout);

    const cartCount = useShopStore((state) => 
        state.cart.reduce((sum,item) => sum + item.quantity, 0)
    );

    const favoriteCount = useShopStore((state) => state.favoriteIds.length);
    const orderCount = useShopStore((state) => state.orders.length);

    const unreadCount = useShopStore(
        (state) => state.notifications.filter((item) => !item.read).length
    );

    const firstName = user?.name?.trim().split(/\s+/)[0] || "there";

    const initials = 
        user?.name
            ?.trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join("") || "";

    function handleLogout() {
        Alert.alert(
            "Log out",
            "Are you sure you want to log out of your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Log out",
                    style: "destructive",
                    onPress: () => logout(),
                },
            ]
        );
    }
    
    return(
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Page title */}
                <View style={styles.header}>
                    <View>
                         <Text style={styles.eyebrow}>YOUR SPACE</Text>
                         <Text style={styles.title}>My profile</Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate("Settings")}
                        style={({ pressed }) => [
                            styles.headerButton,
                            pressed && styles.pressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Open settings"
                    >
                        <Ionicons 
                            name="settings-outline"
                            size={12}
                            color={colors.text}
                        />
                    </Pressable>
                 </View>

                 {/* User card */}
                 <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        <View style={styles.avatar}>
                            {initials ? (
                                <Text style={styles.avatarText}>{initials}</Text>
                            ): (
                                <Ionicons
                                    name="person"
                                    size={34}
                                    color={colors.primary}
                                />
                            )}

                            <View style={styles.onlineIndicator} />
                        </View>

                        <View style={styles.profileInfo}>
                            <Text style={styles.greeting}>
                                {user ? `Welcome back, ${firstName}!` : "Welcome to AliMarket"}
                            </Text>

                            <Text numberOfLines={1} style={styles.name}>
                                {user?.name ?? "Guest customer"}
                            </Text>

                            <Text numberOfLines={2} style={styles.email}>
                                {user?.email ?? "Sign in to manage your account"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.profileDivider} />

                    <View style={styles.profileBottom}>
                        <View style={styles.memberInfo}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={17}
                                color={colors.primary}
                            />
                            <Text style={styles.memberText}>
                                {user ? "Your account" : "Personal shopping"}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                user ? handleLogout() : navigation.navigate("Auth")
                            }
                            style={({ pressed }) => [
                                styles.authButton,
                                user && styles.logoutButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.authButtonText,
                                    user && styles.logoutButtonText,
                                ]}
                            >
                                {user ? "Your account" : "Personal shopping"}
                            </Text>

                            <Ionicons
                                name={user ? "log-out-outline" : "arrow-forward"}
                                size={16}
                                color={user ? colors.danger : colors.white}
                            />
                        </Pressable>
                    </View>
                 </View>

                {/* Statistics */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your activity</Text>
                    <Text style={styles.sectionHint}>A quick overview</Text>
                </View>
                
                <View style={styles.statsRow}>
                    <StatCard
                        icon="bag-handle-outline"
                        value={cartCount}
                        label="In cart"
                        onPress={() => navigation.navigate("MainTabs", { screen: "Cart" })}
                    />

                    <StatCard 
                        icon="heart-outline"
                        value={favoriteCount}
                        label="Saved"
                        onPress={() =>
                            navigation.navigate("MainTabs", { screen: "Favorites" })
                        }
                    />

                    <StatCard 
                        icon="receipt-outline"
                        value={favoriteCount}
                        label="Saved"
                        onPress={() => 
                            navigation.navigate("MainTabs", { screen: "Favorites" })
                        }
                    />

                    <StatCard
                        icon="receipt-outline"
                        value={orderCount}
                        label="Orders"
                        onPress={() => navigation.navigate("Orders")}
                    />
                </View>
                 {/* Shopping */}
                <SectionHeading
                    title="Shopping"
                    subtitle="Your orders and payment details"
                />

                <View style={styles.menuGroup}>
                    <MenuItem 
                        label="Order history"
                        description="Track and review your purchases"
                        icon="receipt-outline"
                        onPress={() => navigation.navigate("Orders")}
                    />

                    <MenuItem
                        label="Shipping addresses"
                        description="Manage delivery destinations"
                        icon="location-outline"
                        onPress={() => navigation.navigate("Addresses")}
                    />
                    <MenuItem
                        label="Payment methods"
                        description="Manage your payment options"
                        icon="card-outline"
                        onPress={() => navigation.navigate("PaymentMethods")}
                    />
                    
                    <MenuItem
                        label="Wishlist collections"
                        description="Organize your favorite products"
                        icon="albums-outline"
                        onPress={() => navigation.navigate("WishlistCollections")}
                    />
                </View>

                {/* Services */}
                <SectionHeading
                    title="Services"
                    subtitle="Tools to make shopping easier"
                />
                <View style={styles.menuGroup}>
                    <MenuItem
                        label="QR & barcode scanner"
                        description="Scan a code or coupon"
                        icon="scan-outline"
                        onPress={() => navigation.navigate("QRScanner")}
                    />

                    <MenuItem 
                        label="Notifications"
                        description={
                            unreadCount > 0
                                ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
                                : "You're all caught up"
                        }
                        icon="notifications-outline"
                        badge={unreadCount > 0 ? String(unreadCount) : undefined}
                        onPress={() => navigation.navigate("Notifications")}
                    />

                    <MenuItem
                        label="Support center"
                        description="Get help with your shopping"
                        icon="help-circle-outline"
                        onPress={() => navigation.navigate("Support")}
                    />
                </View>

                {/* Settings */}
                <SectionHeading
                    title="Preferences"
                    subtitle="Customize your experience"
                />

                <View style={styles.menuGroup}>
                    <MenuItem
                        label="Settings"
                        description="Theme, language and appearance"
                        icon="options-outline"
                        onPress={() => navigation.navigate("Settings")}
                    />
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerLogo}>
                        <Ionicons 
                            name="bag-handle"
                            size={16}
                            color={colors.primary}
                        />
                    </View>

                    <Text style={styles.footerBrand}>AliMarket</Text>
                    <Text style={styles.footerCaption}>
                        A little something for everyone.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function StatCard({
  icon,
  value,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.statCard,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      <View style={styles.statIcon}>
        <Ionicons name={icon} size={19} color={colors.primary} />
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Pressable>
  );
}

/* Heading for a group of settings and services. */
function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionHint}>{subtitle}</Text>
    </View>
  );
}

/* Universal menu item with an icon, description, and badge. */
function MenuItem({
  label,
  description,
  icon,
  badge,
  onPress,
}: {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${description}`}
    >
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={21} color={colors.primary} />
      </View>

      <View style={styles.menuInfo}>
        <Text style={styles.menuText}>{label}</Text>
        <Text numberOfLines={2} style={styles.menuDescription}>
          {description}
        </Text>
      </View>

      {badge ? (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>{badge}</Text>
        </View>
      ) : null}

      <Ionicons
        name="chevron-forward"
        size={18}
        color={colors.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 32,
    },
    
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 2,
        marginBottom: 5,
    },

    title: {
        color: colors.text,
        fontSize: 30,
        lineHeight: 36,
        fontWeight: "900",
        letterSpacing: -0.8,
    },

    headerButton: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },

    profileCard: {
        backgroundColor: colors.surface,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 17,
    },

    profileTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 23,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: colors.primary,
        fontSize: 23,
        fontWeight: "900",
    },

    onlineIndicator: {
        position: "absolute",
        width: 13,
        height: 13,
        right: -2,
        bottom: -2,
        borderRadius: 7,
        backgroundColor: colors.success,
        borderWidth: 2,
        borderColor: colors.surface,
    },
    profileInfo: {
        flex: 1,
        minWidth: 0,
    },
    greeting: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
        marginBottom: 4,
    },

    name: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "900",
    },
    email: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 17,
        marginTop: 4,
    },
    profileDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
    },

    profileBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },

    memberInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },

    memberText: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "700",
    },

    authButton: {
        minHeight: 38,
        borderRadius: 13,
        backgroundColor: colors.primary,
        paddingHorizontal: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    authButtonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "900",
    },

    logoutButton: {
        backgroundColor: colors.surfaceSoft,
    },

    logoutButtonText: {
        color: colors.danger,
    },

    sectionHeader: {
        marginTop: 25,
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: "900",
    },

    sectionHint: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 4,
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
    },

    statCard: {
        flex: 1,
        minWidth: 0,
        padding: 12,
        borderRadius: 19,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
})