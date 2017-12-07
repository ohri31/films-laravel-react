<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('films', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->default('No informations');
            $table->text('description');
            $table->date('release_date');
            $table->integer('rating')->unsigned();
            $table->integer('ticke_price')->unsigned();
            $table->integer('country_id')->unsigned();
            $table->integer('genre_id')->unsigned();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('films');
    }
}
