<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSentEvent;
use App\Message;
use App\User;
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
        $user = User::find($request->get('user_id'));
        $message = $user->messages()->create([
            'messages' => request()->message,
            'message_id' => request()->message_id
        ]);

        event(new MessageSentEvent($user, $request->message));
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
