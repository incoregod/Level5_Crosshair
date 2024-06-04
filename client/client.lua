
RegisterNetEvent('lvl5_crosshair:openUI',function()
    SendNUIMessage(
        {
            action = "openUI",
            SetNuiFocus(true, true)
        }
    )

end)

RegisterNUICallback(
    "close",
    function(data)
        SetNuiFocus(false, false)
    end
)

RegisterCommand('crosshair', function(source, args)
    TriggerEvent('lvl5_crosshair:openUI')
end)
