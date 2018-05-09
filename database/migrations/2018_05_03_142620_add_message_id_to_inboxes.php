<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMessageIdToInboxes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inboxes', function($table) {
            $table->integer('message_id')->unsigned();
            $table->enum('flag', ['completed', 'received']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('inboxes', function($table) {
            $table->dropColumn('message_id');
            $table->dropColumn('flag');
        });
    }
}
