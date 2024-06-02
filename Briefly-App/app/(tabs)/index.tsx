import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import Container from "@/components/Container";
import { Article } from "@/types";
import ListItem from "@/components/Article/ListItem";
import { useArticle } from "@/core/store/articleContext";
import { router } from "expo-router";
import Colors from "@/core/constants/Colors";
import Svg, { Path, SvgProps } from "react-native-svg";
import { useSession } from "@/core/store/sessionContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "@/core/api/articles";
import { Text, View } from "@/components/Themed";

const Logo = (props: SvgProps) => {
  const session = useSession();
  return (
    <Pressable onPress={session.clearToken}>
      <Svg width={92} height={109} fill="none" {...props}>
        <Path
          fill="#2D2D2D"
          d="M0 0v91.974h46.379c32.583 0 46.773-33.768 25.753-49.273C87.372 25.882 72.915 0 47.822 0H0ZM75.725 94.664a2.69 2.69 0 0 1 2.69-2.69h10.76a2.69 2.69 0 0 1 2.69 2.69v10.76a2.69 2.69 0 0 1-2.69 2.69h-10.76a2.69 2.69 0 0 1-2.69-2.69v-10.76Z"
        />
      </Svg>
    </Pressable>
  );
};

const index = () => {
  const { setArticle } = useArticle();

  const { data, error, fetchNextPage, refetch, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<
    Article[],
    Error
  >({
    queryKey: ["articles"],
    queryFn: ({ pageParam = 1 }) => getArticles(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1; // Assuming you use the page number for pagination
    },
  });

  const handlePress = useCallback(
    (article: Article) => {
      setArticle(article);
      router.push("/(app)/ArticleView");
    },
    [setArticle, router]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Article; index: number }) => (
      <ListItem index={index % 10} article={item} onPress={() => handlePress(item)} />
    ),
    [handlePress]
  );
  const keyExtractor = useCallback((item: Article) => `ArticleList${item.id.toString()}`, []);

  if (status === "error") {
    console.log(error.message);
    return (
      <Container>
        <Text variant="heading">Error</Text>
      </Container>
    );
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
        // implement pull to refresh
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            // return <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/loading.json")} />;
            return <ListItem skeleton index={0} article={{} as Article} onPress={() => {}} />;
          } else {
            return null;
          }
        }}
      />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  backgroundMuted: {
    backgroundColor: Colors.listBackground,
  },
  list: {
    width: "100%",
    marginTop: 50,
    marginBottom: 50,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginTop: 20,
  },
  contentContainer: {
    gap: 20,
    width: "100%",
  },
  lottie: {
    width: "100%",
    height: 150,
  },
});
