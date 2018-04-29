<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSentEvent;
use App\Message;
use App\User;
use App\Outbox;
use App\Inbox;
use App\DetMessage;
use DB;

class ChatController extends Controller
{
    public function fetchMessages()
    {
        $messages = DB::table('det_messages')
                    ->join('messages', 'messages.id', '=', 'det_messages.message_id')
                    ->join('users', 'users.id', '=', 'messages.user_1')
                    ->join('users AS user1', 'user1.id', '=', 'messages.user_2')
                    ->select('users.*', 'messages.*', 'det_messages.*')
                    ->get();

        return response()->json($messages);
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        $receiveds = '';
        $receivedId = Message::select('user_2')
                    ->where('id',$request->chatID)
                    ->first();
        if($request->userId == $receivedId->user_2){
            $receivedId = Message::select('user_1')
                    ->where('id',$request->chatID)
                    ->first(); 
            $receiveds = $receivedId->user_1;
        }else{
            $receivedId = Message::select('user_2')
                    ->where('id',$request->chatID)
                    ->first();
            $receiveds = $receivedId->user_2;
        }

        // return $receiveds;
        $outbox = new Outbox();
        $outbox->sender_id = $request->userId;
        $outbox->received_id = $receiveds;
        $outbox->messages = $request->content;
        $outbox->save();

        $inbox = new Inbox();
        $inbox->sender_id = $request->userId;
        $inbox->received_id = $receiveds;
        $inbox->messages = $request->content;
        $inbox->save();

    }

    public function createChat(Request $request)
    {
        $countChat = Message::where('user_1', $request->user1)
            ->where('user_2', $request->user2)
            ->orWhere(function($q) use($request) {
                $q->where('user_1', $request->user2)
                ->where('user_2', $request->user1);
            })
        ->get();

        if($countChat->count() < 1){
            $chatRoom = new Message();
            $chatRoom->user_1 = $request->user1;
            $chatRoom->user_2 = $request->user2;
            $chatRoom->save();
            
            $idChat = Message::max('id')
                ->where('user_1',$request->user1)
                ->where('user_2',$request->user2);
            return $idChat;

        }else{
            $idChat = DB::table('messages')
                ->select('id')
                ->where('user_1','=',$request->user1,'AND','user_2','=',$request->user2)
                ->orWhere('user_1','=',$request->user2,'AND','user_2','=',$request->user1)
                ->get();
            return $idChat;
            
        }
    }
}
