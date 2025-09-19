import {View, Image, ScrollView, ActivityIndicator, Text, FlatList} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/component/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";

export default function Index () {
	const router = useRouter ();
	const {
		data   : movies,
		loading: moviesLoading,
		error  : moviesError
	} = useFetch (() => fetchMovies ({
			query: ''
		}
	))
	
	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute z-0 w-full"/>
			<FlatList
				data={movies}
				renderItem={({item}) => (
					<Text className="text-white text-sm">{item.title}</Text>
				
				)}
				keyExtractor={(item) => item.id.toString ()}
				numColumns={3}
				columnWrapperStyle={{
					gap           : 10,
					justifyContent: 'flex-start',
					paddingRight  : 5,
					marginBottom  : 10
				}}
				className="mt-2 pb-32"
				ListHeaderComponent={
					<>
						<Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
						<SearchBar
							onPress={() => router.push ("/search")}
							placeholder="Search for a movie"
						/>
						<Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
					</>
				}
				contentContainerStyle={{paddingBottom: 10}}
				showsVerticalScrollIndicator={false}
			/>
		
		</View>
	);
}
