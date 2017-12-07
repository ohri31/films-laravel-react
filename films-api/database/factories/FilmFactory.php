<?php

use Faker\Generator as Faker;

$factory->define(App\Film::class, function (Faker $faker) {
	$name = $faker->name;
	$slug = str_slug($name);

	return [
		'name' => $name,
		'description' => $faker->text,
		'release_date' => $faker->date,
		'rating' => $faker->numberBetween(1, 5),
		'ticke_price' => $faker->numberBetween(10, 50),
		'slug' => $slug,
		'country_id' => $faker->numberBetween(1, 39),
		'genre_id' => $faker->numberBetween(1, 9)
	];
});

?>