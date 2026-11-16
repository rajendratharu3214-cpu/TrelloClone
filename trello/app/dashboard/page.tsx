"use client"
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBoards } from "@/lib/hooks/useBoards";
import { useUser } from "@clerk/nextjs";
import { Loader2, Plus } from "lucide-react";

//https://tidy-basilisk-8846.clerk.accounts.dev
export default function DashboardPage() {
    const { user } = useUser();
    const { createBoard, boards, loading, error } = useBoards();
    const handleCreateBoard = async () => {
        await createBoard({title:"New Board"});
    }

    if(loading){
        return(<div>
            <Loader2/><span>
                Loading your boards...
            </span></div>)
    }
    if(error){
        return(<div>
            <h2>
                Error loading boards...
            </h2> <p>{error}</p>
            </div>)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Wellcome back, {' '} {user?.firstName ?? user?.emailAddresses[0].emailAddress}!
                    </h1>
                    <p className="text-gray-600">
                        Here's what's happening with your boards today.
                    </p>
                    <Button className="w-full sm:w-auto"
                        onClick={handleCreateBoard}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Board
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div>
                                <div>
                                    <p>Total Board</p>
                                    <p>{boards.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

// function useBoards(): { createBoard: any; } {
//     throw new Error("Function not implemented.");
// }
