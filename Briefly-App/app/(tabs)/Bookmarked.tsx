import { FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import Container from "@/components/Container";
import { Article } from "@/types";
import ListItem from "@/components/Article/ListItem";
import Logo from "@/components/Logo";
import Colors from "@/core/constants/Colors";
import { Text, View } from "@/components/Themed";
import { t } from "@/core/i18n";
import { Redirect, useFocusEffect } from "expo-router";
import useBookmarksList from "@/core/hooks/screenHooks/Bookmarks";
import LottieView from "lottie-react-native";

const Bookmarked = () => {
  const { handlePress, data, error, fetchNextPage, refetch, hasNextPage, isFetching, isFetchingNextPage, status } =
    useBookmarksList();

  useFocusEffect(
    useCallback(() => {
      console.log("Focused Bookmarked");
      refetch();
    }, [])
  );
  const renderItem = useCallback(
    ({ item, index }: { item: Article; index: number }) => (
      <ListItem index={index % 10} article={item} onPress={() => handlePress(item)} />
    ),
    [handlePress]
  );
  const keyExtractor = useCallback((item: Article) => `BookmarksList${item.id.toString()}`, []);

  if (status === "error") {
    console.log(error?.message);
    return <Redirect href="/(auth)/SignIn" />;
  }

  if (status === "pending") {
    return (
      <Container>
        <View style={{ paddingTop: 50 }}>
          <ListItem skeleton index={0} article={{} as Article} onPress={() => {}} />
          <ListItem skeleton index={0} article={{} as Article} onPress={() => {}} />
          <ListItem skeleton index={0} article={{} as Article} onPress={() => {}} />
          <ListItem skeleton index={0} article={{} as Article} onPress={() => {}} />
        </View>
      </Container>
    );
  }

  if (data?.pages.flat().length === 0) {
    return (
      <Container style={{ gap: 40 }}>
        <Text variant="title">{t.bookmarks.title}</Text>
        <Text variant="subheading">{t.bookmarks.noBookmarks}</Text>
        <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/loading.json")} />
      </Container>
    );
  }

  return (
    <Container style={styles.backgroundMuted}>
      <FlatList
        data={data?.pages.flat() as Article[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={<Logo />}
        ListHeaderComponentStyle={{ alignItems: "center", marginBottom: 30 }}
        removeClippedSubviews={true} // This might help for long lists
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <ListItem skeleton index={0} article={{} as Article} onPress={() => {}} />;
          } else {
            return null;
          }
        }}
      />
    </Container>
  );
};

export default Bookmarked;

const styles = StyleSheet.create({
  backgroundMuted: {
    backgroundColor: Colors.listBackground,
  },
  list: {
    width: "100%",
    marginTop: 50,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginTop: 20,
  },
  contentContainer: {
    gap: 20,
    width: "100%",
    paddingBottom: 50,
  },
  lottie: {
    // width: "100%",
    // height: 200,
    width: "100%",
    height: 400,
    marginTop: 40,
  },
});
