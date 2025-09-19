import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {images} from "@/constants/images";
import MovieCard from "@/components/movieCard";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
	
	const [searchQuery, setSearchQuery] = useState('');
	
	const {
		data: movies,
		loading,
		error,
		refetch: loadMovies,
		reset
	} = useFetch(() => fetchMovies({
									   query: searchQuery
								   }
	), false)
	
	const trimmedQuery = searchQuery.trim();
	const hasMovies = Array.isArray(movies) && movies.length > 0;
	const showSearchResultsHeader = !loading && !error && !!trimmedQuery && hasMovies;
	
	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (trimmedQuery) {
				await loadMovies();
			} else {
				reset()
			}
		}, 500);
		
		return () => clearTimeout(timeoutId)
	}, [searchQuery])
	
	
	return (
		<View className={"flex-1 bg-primary"}>
			<Image source={images.bg} className={"flex-1 absolute z-0 w-full"} resizeMode={"cover"}/>
			<FlatList
				data={movies}
				renderItem={({item}) => <MovieCard {...item}/>}
				keyExtractor={item => item.id.toString()}
				className={"px-5"}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: 'center',
					gap           : 16,
					marginVertical: 16
				}}
				contentContainerStyle={{paddingBottom: 100}}
				ListHeaderComponent={
					<>
						<View className={"w-full flex-row justify-center mt-20 items-center"}>
							<Image source={icons.logo} className={"w-12 h-10"}/>
						</View>
						<View className={"my-5"}>
							<SearchBar placeholder="Search for a movie"
									   value={searchQuery}
									   onChangeText={(text) => setSearchQuery(text)}
							/>
						</View>
						{loading && (
							<ActivityIndicator size={"large"} color={"#0000ff"} className={"my-3"}/>
						)}
						{error && (
							<Text className={"text-red-500 px-5 my-3"}>Error: {error.message}</Text>
						)}
						
						
						{showSearchResultsHeader && (
							<Text className={"text-xl text-white font-bold"}> Search Results for {''}
								<Text className={"text-accent"}> {trimmedQuery}</Text>
							</Text>
						)}
					</>
				}
				ListEmptyComponent={
					!loading && !error ? (
						<View className="mt-10 px-5">
							<Text className="text-white text-center">
								{trimmedQuery ? 'No movies found' : 'Search for a movie'}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};


export default Search;