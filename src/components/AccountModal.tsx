import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import { useAuth } from "../lib/AuthContext";
import { FiX, FiUser, FiMail, FiLogOut } from "react-icons/fi";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const userInitial = user?.displayName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-[20px] shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
            <DialogTitle className="text-lg font-bold text-[#111827]">Account Management</DialogTitle>
            <DialogClose asChild>
              <button className="text-[#9CA3AF] hover:text-[#111827] transition-colors p-1 rounded-full hover:bg-gray-100">
                <FiX className="text-xl" />
              </button>
            </DialogClose>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-3xl font-bold shadow-sm overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  userInitial
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#111827]">{user?.displayName || "User"}</h3>
                <p className="text-[#6B7280] text-[15px]">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-[12px] border border-[#E5E7EB] bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#E5E7EB] shrink-0">
                  <FiUser className="text-[#6B7280]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#6B7280] font-medium">Display Name</p>
                  <p className="text-[15px] text-[#111827] font-semibold">{user?.displayName || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-[12px] border border-[#E5E7EB] bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#E5E7EB] shrink-0">
                  <FiMail className="text-[#6B7280]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#6B7280] font-medium">Email Address</p>
                  <p className="text-[15px] text-[#111827] font-semibold">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border-t border-[#E5E7EB]">
            <button
              onClick={handleLogout}
              className="w-full h-[48px] bg-white border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444] text-[15px] font-semibold rounded-[12px] transition-colors flex items-center justify-center gap-2"
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
