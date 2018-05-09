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
    public function fetchinbox()
    {
        $inbox = DB::table('inboxes')
                ->select('users.name as username','inboxes.*')
                ->join('users','users.id','=','inboxes.sender_id')
                ->where('flag','received')
                ->get();

        return response()->json($inbox);
    }

    public function updateInbox(Request $request)
    {
        $inbox = Inbox::find($request->id);
        $inbox->flag = 'completed';
        $inbox->save();

        $outbox = new Outbox();
        $outbox->message_id = $request->message_id;
        $outbox->sender_id = $request->sender_id;
        $outbox->received_id = $request->received_id;
        $outbox->messages = $request->messages;
        $outbox->flag = 'completed';
        $outbox->save();
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
        $outbox->message_id = $request->chatID;
        $outbox->sender_id = $request->userId;
        $outbox->received_id = $receiveds;
        $outbox->messages = $request->content;
        $outbox->flag = 'completed';
        $outbox->save();

        $inbox = new Inbox();
        $inbox->message_id = $request->chatID;
        $inbox->sender_id = $request->userId;
        $inbox->received_id = $receiveds;
        $inbox->messages = $request->content;
        $inbox->flag = 'completed';
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
        
        // return $countChat;

        if($countChat->count() < 1){
            $chatRoom = new Message();
            $chatRoom->user_1 = $request->user1;
            $chatRoom->user_2 = $request->user2;
            $chatRoom->save();
            
            $idChat = DB::table('messages')
                ->select('id')
                ->where('user_1',$request->user1)
                ->where('user_2',$request->user2)
                ->first();
            return $idChat->id;

        }else{
            $idChat = Message::select('id')
            ->where('user_1', $request->user1)
            ->where('user_2', $request->user2)
            ->orWhere(function($q) use($request) {
                $q->where('user_1', $request->user2)
                ->where('user_2', $request->user1);
            })->first();
            return $idChat->id;
            
        }
    }
}
